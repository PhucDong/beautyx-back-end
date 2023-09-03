import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSalonDto, searchSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonTypesDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { SalonTypeEnum } from 'src/constants';
import { ArrayContains, In, Like, Repository } from 'typeorm';
import * as fs from 'fs';
@Injectable()
export class SalonService {
    constructor(
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
        @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
        ) {}

    
    async getSalons(pageSize: number, pageNumber: number, sortOption?: string){
        const salons = await this.salonRepository.find({relations: ['appointments']});
        
        const salonToReturn = this.formatAndSortSalons(salons, sortOption)

        return salonToReturn
    }

    async getSalonsPage(page: number, pageSize: number, keyword: string) {
        const [list, count] = await this.salonRepository.findAndCount({
        //   order: { createdAt: 'DESC', },
            relations: ['serviceCategories'],
            where: [
                { salonName: Like(`%${keyword}%`) },
                { salonAddress: Like(`%${keyword}%`) },
                //{ serviceCategories.some((category) => category.serviceCategoryName == keyword )},
                {serviceCategories: {serviceCategoryName: Like(`%${keyword}%`) }}

            ],
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return { list, count, page, pageSize }

        //const reviews = await this.reviewRepository.find({ relations: ['appointment', 'customer'], where: {appointment: { id: In(appointmentIdList) } } })
        // const salonPage = await this.salonRepository.find({

        //         relations: ['serviceCategories'],
        //         where: [
        //             { salonName: Like(`%${keyword}%`) },
        //             { salonAddress: Like(`%${keyword}%`) },
        //             //{ serviceCategories.some((category) => category.serviceCategoryName == keyword )},
        //             //{serviceCategories: ArrayContains([ Like(`%${keyword}%`) ]),}
        //             {serviceCategories: {serviceCategoryName: Like(`%${keyword}%`) }}
    
        //         ],
        //         skip: (page - 1) * pageSize,
        //         take: pageSize,
        //     });

        //     return salonPage

    }

    async getSalonsFiltered(pageSize: number, pageNumber: number, salonType: string, sortOption?: string){
        const filterArray = salonType.split('-')
        let filteredSalon: SalonEntity[] = []
        const salons = await this.salonRepository.find({relations: ['appointments']});
        for (var i = 0; i < salons.length; i++){
            const salonTypesArray = salons[i].salonTypes.split(',')
            // console.log("filter array: " + filterArray);
            // console.log("salon type array: " + salonTypesArray)
            if ( filterArray.some((type) => salonTypesArray.includes(type) ) ){
                console.log("found salon type in salonTypes")
                filteredSalon.push(salons[i])
            }

        }
        const salonToReturn = await this.formatAndSortSalons(filteredSalon, sortOption)
        const salonPage = await this.customPagination(salonToReturn, pageSize, pageNumber)
        return salonPage
    }
    
    async searchSalonQuery(searchKey: string, pageSize: number, pageNumber: number){
        const salons = await this.salonRepository.find({relations: ['serviceCategories', 'appointments']});
        const sortedSalons = await this.formatAndSortSalons(salons)
        if (searchKey.length == 0) throw new HttpException('the search keyword cannot be empty', HttpStatus.BAD_REQUEST)

        searchKey = searchKey.toLowerCase();
        const searchKeyList = searchKey.split(' ')

        console.log("list of keys to find in query")
        console.log(searchKeyList)

        var foundList = []
        console.log('length of sorted salon: ' + sortedSalons.length)
        //console.log(sortedSalons)
        for (var i = 0; i < sortedSalons.length; i++){
            console.log('search salon loop: ' + i)
            const salonToSearch = sortedSalons[i]
            // console.log("salon being searched")
            //console.log(salonToSearch)
            var searchkeyFound = 0;
            var totalSearchScore = 0;
            for (var k = 0; k < searchKeyList.length; k++){
                 console.log('search key loop number: ' + k)
                const searchKey = searchKeyList[k]
                    
                let startIndex = 0, index: number, salonNameIndices = [], salonAddressIndices = [], salonServiceCategoryIndices = [];
                while ((index = salonToSearch.salonName.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonNameIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                startIndex = 0
                while ((index = salonToSearch.salonAddress.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonAddressIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                let categoryScore = 0
                console.log("service categories: " + salonToSearch.serviceCategories)
                for ( var j = 0; j < salonToSearch.serviceCategories.length; j++){
                    console.log("serivce categories search loop: " + j)
                    const categoryToSearch = salonToSearch.serviceCategories[j]
                    var categoryStartIndex = 0, categoryIndices = []
                    while ((index = categoryToSearch.serviceCategoryName.toLowerCase().indexOf(searchKey, categoryStartIndex)) > -1) {
                        categoryIndices.push(index);
                        categoryStartIndex = index + searchKey.length;
                    }
                    //if (categoryIndices.length != 0) console.log('found result in service categories number: ' + j + ' -------------------')

                    salonServiceCategoryIndices.push(categoryIndices)
                    categoryScore += categoryIndices.length
                }
                console.log('category score: ' + categoryScore)
                console.log("salon service category indices length: " + salonServiceCategoryIndices.length)
                // if (salonNameIndices.length != 0) console.log('found result in salon names-------')
                // if (salonAddressIndices.length != 0) console.log('found result in salon address-------')
                // if (categoryScore != 0) console.log('found result in salon categories-------')

                const resultScore = salonNameIndices.length + salonAddressIndices.length + categoryScore
                if (resultScore != 0) {
                    searchkeyFound++
                    totalSearchScore += resultScore
                    // console.log("number of search key found: " + searchkeyFound)
                    // console.log("total search score: " + totalSearchScore)
                }
            }
            console.log("number of search key found: " + searchkeyFound)
            console.log("total search score: " + totalSearchScore)
            // if (searchkeyFound == searchKeyList.length) {
            //     // console.log('search key found match number of search key')
            //     const salonFound = {...salonToSearch, totalSearchScore}
            //     foundList.push(salonFound)
                
            // }
            if (searchkeyFound != 0) {
                //console.log("search key found is added to found list: " + searchkeyFound)
                const salonFound = {...salonToSearch, totalSearchScore}
                foundList.push(salonFound)
                
            }
        }
        
        foundList.sort((a, b) => a.totalSearchScore + b.totalSearchScore);
        const foundListSorted = this.quickSortSearchScore(foundList)
        //console.log(foundList)

        const pageToReturn = this.customPagination(foundListSorted, pageSize, pageNumber)
        
        return pageToReturn
        
    }

    async getSalon(idToFind: number){
        const salon = await this.salonRepository.findOne({relations: ['appointments', 'manager'], where: {id: idToFind}});
        if (!salon) throw new HttpException('the salon with the given id cannot be found', HttpStatus.NOT_FOUND)

        const salonToReturn = this.formatSalonForDisplay(salon)

        return salonToReturn

    }
    
    getSalonServiceCategories(idToFind: number){
        return this.salonRepository.findOne({relations: ['serviceCategories'], where: {id: idToFind}});
    }
    getSalonAppointments(idToFind: number){
        return this.salonRepository.findOne({relations: ['appointments'], where: {id: idToFind}});
    }
    getSalonInventories(idToFind: number){
        return this.salonRepository.findOne({relations: ['inventories'], where: {id: idToFind}});
    }
    getSalonEmployess(idToFind: number){
        return this.salonRepository.findOne({relations: ['employees'], where: {id: idToFind}});
    }
  
    createSalon(newSalon: createSalonDto){
        var workDays = ''
        for (var i = 0; i < newSalon.workDays.length; i++){
            const currentWorkDay = newSalon.workDays[i]
            workDays += currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' +currentWorkDay.endTime + ','
        }

        if (workDays.charAt(workDays.length - 1) == ','){
            workDays = workDays.substring(0, workDays.length - 1)
        }

        var salonTypes = ''
        for (var i = 0; i < newSalon.salonTypes.length; i++) {
            const currentType = newSalon.salonTypes[i]
            salonTypes += currentType + ','
        }
        if (salonTypes.charAt(salonTypes.length - 1) == ','){
            salonTypes = salonTypes.substring(0, salonTypes.length - 1)
        }

        const salonToSave = this.salonRepository.create({...newSalon, workDays, salonTypes});
        
        return this.salonRepository.save(salonToSave)
    }

    updateSalon(idToUpdate: number, updateDetails: updateSalonDto){
        return this.salonRepository.update( idToUpdate, {...updateDetails})

    }
    async updateSalonHighLights(idToUpdate: number, updateDetails: updateSalonHighLightsDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s highlights', HttpStatus.NOT_FOUND)
        for ( var i = 0; i < updateDetails.highLights.length; i++ ){
            const currentHighLight = updateDetails.highLights[i]
            const indexToFind = salonToUpdate.highLights.indexOf(currentHighLight)
            if (indexToFind == -1){
                if (salonToUpdate.highLights == ''){
                    salonToUpdate.highLights = currentHighLight
                } else {
                    salonToUpdate.highLights = salonToUpdate.highLights + ',' + currentHighLight
                }
            } else {
                const leftString = salonToUpdate.highLights.substring(0, indexToFind);
                const rightString = salonToUpdate.highLights.substring(indexToFind + currentHighLight.length + 1);
                salonToUpdate.highLights = leftString + rightString
                if (salonToUpdate.highLights.charAt(salonToUpdate.highLights.length - 1) == ','){
                    salonToUpdate.highLights = salonToUpdate.highLights.substring(0, salonToUpdate.highLights.length - 1)
                }

            }
        }
        
        return this.salonRepository.save(salonToUpdate);

    }
    async updateSalonTypes(idToUpdate: number, updateDetails: updateSalonTypesDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s salon type', HttpStatus.NOT_FOUND)

        for (var i = 0; i < updateDetails.salonTypes.length; i++ ){
            const currentType = updateDetails.salonTypes[i]
            // console.log("the current type is: " + currentType)
            const indexToFind = salonToUpdate.salonTypes.indexOf(currentType)
            if (indexToFind == -1){
                if (salonToUpdate.salonTypes == ''){
                    salonToUpdate.salonTypes = currentType
                } else {
                    salonToUpdate.salonTypes = salonToUpdate.salonTypes + ',' + currentType
                }
            } else {
                const leftString = salonToUpdate.salonTypes.substring(0, indexToFind);
                const rightString = salonToUpdate.salonTypes.substring(indexToFind + currentType.length + 1);
                // console.log("left: " + leftString)
                // console.log("right: " + rightString)
                salonToUpdate.salonTypes = leftString + rightString
                if (salonToUpdate.salonTypes.charAt(salonToUpdate.salonTypes.length - 1) == ','){
                    salonToUpdate.salonTypes = salonToUpdate.salonTypes.substring(0, salonToUpdate.salonTypes.length - 1)
                }
    
            }
        }
        return this.salonRepository.save(salonToUpdate);

    }
    async updateSalonWorkDay(idToUpdate: number, updateDetails: updateSalonWorkDayDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s workday', HttpStatus.NOT_FOUND)

        // var [day, startTime, endTime] = updateDetails.workDay.split('-')
        // var timeFormat: RegExp = /^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/;

        // if (timeFormat.test(startTime) == false) throw new HttpException("the start time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        // if (timeFormat.test(endTime) == false) throw new HttpException("the end time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        
        salonToUpdate.workDays = this.updateWorkDay(salonToUpdate.workDays, updateDetails)

        return this.salonRepository.save(salonToUpdate);

    }
    
    async updateSalonWorkDayList(idToUpdate: number, updateDetails: updateSalonWorkDayListDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s workday', HttpStatus.NOT_FOUND)
        
        for (var i = 0; i < updateDetails.workDayList.length; i++ ){
            const currentWorkDay = updateDetails.workDayList[i]
            salonToUpdate.workDays = this.updateWorkDay(salonToUpdate.workDays, currentWorkDay)

        }
        
        return this.salonRepository.save(salonToUpdate);

    }
    
    deleteSalon(idToDelete: number){
        return this.salonRepository.delete( idToDelete)

    }

    async updateSalonPhoto(idToUpdate: number, file: Express.Multer.File){
        console.log("file name in the update salon photo service: " + file.filename)
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s photos', HttpStatus.NOT_FOUND)
        const photoName = file.filename
        const photoNameParts = photoName.split('_')
        const photoArray = salonToUpdate.salonPhotos.split(',')
        //console.log("photo name part 0: " + photoNameParts[0])
        console.log('salon photo string: ' + salonToUpdate.salonPhotos)
        console.log('the length of the photo array: ' + photoArray.length)
        console.log('photo array: ' + photoArray)
        if (salonToUpdate.salonPhotos == ""){
            console.log("photo string is null")
            salonToUpdate.salonPhotos = photoName
            return this.salonRepository.save(salonToUpdate);
        }
        for (var i = 0; i < photoArray.length; i++){
            const currentPhoto = photoArray[i]
            console.log("current photo name: " + currentPhoto)
            const indexToFind = currentPhoto.indexOf(photoNameParts[0])
            
            if (indexToFind == -1){
                if( i != photoArray.length -1 ){
                    continue
                } else {
                    salonToUpdate.salonPhotos = salonToUpdate.salonPhotos + ',' + photoName
                    return this.salonRepository.save(salonToUpdate);
                }
            } else {
                photoArray.splice(i, 1, photoName)
                const oldPath = './pics/' + currentPhoto
                console.log('photo old path: ' + oldPath)
                let newPhotoStr = ''
                
                if (fs.existsSync(oldPath)) {
                  fs.unlink(oldPath, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                  });
                }
                for (var j = 0 ; j < photoArray.length; j++) {
                    newPhotoStr += photoArray[j] + ','
                }
                
                if (newPhotoStr.charAt(newPhotoStr.length - 1) == ','){
                    newPhotoStr = newPhotoStr.substring(0, newPhotoStr.length - 1)
                }
                salonToUpdate.salonPhotos = newPhotoStr
                console.log("new photo string: " + newPhotoStr)
                return this.salonRepository.save(salonToUpdate);
            }
        
                
        }

    }

    // async updateSalonPhoto(idToUpdate: number, photoType: string, file: Express.Multer.File){
    //     console.log("file name in the update salon photo service: " + file.filename)
    //     console.log("phototype in the update salon photo service: " + photoType)
    //     const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
    //     if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s photos', HttpStatus.NOT_FOUND)
    //     const photoName = file.filename
    //     const indexToFind = salonToUpdate.salonPhotos.indexOf(photoName)
    //         if (indexToFind == -1){
    //             if (salonToUpdate.salonPhotos == ''){
    //                 salonToUpdate.salonPhotos = photoName
    //             } else {
    //                 salonToUpdate.salonPhotos = salonToUpdate.salonPhotos + ',' + photoName
    //             }
    //         } else {
    //             const leftString = salonToUpdate.salonPhotos.substring(0, indexToFind);
    //             const rightString = salonToUpdate.salonPhotos.substring(indexToFind + photoName.length + 1);
    //             // console.log("left: " + leftString)
    //             // console.log("right: " + rightString)
    //             salonToUpdate.salonPhotos = leftString + rightString
    //             if (salonToUpdate.salonPhotos.charAt(salonToUpdate.salonPhotos.length - 1) == ','){
    //                 salonToUpdate.salonPhotos = salonToUpdate.salonPhotos.substring(0, salonToUpdate.salonPhotos.length - 1)
    //             }
    
    //         }
        
    
    //     return this.salonRepository.save(salonToUpdate);

    // }

  /////////////// utility functions ///////////////

    workDayStringToArray(workDayStr: string){
        const workDaysList = workDayStr.split(',')
        var workDaysListToReturn = []
        for (var i = 0; i < workDaysList.length; i++) {
            var [dayStr, startTimeStr, endTimeStr] = workDaysList[i].split('-')
            workDaysListToReturn.push({
                workDay: dayStr,
                startTime: startTimeStr,
                endTime: endTimeStr
            })
        }
        return workDaysListToReturn
    }

    async formatSalonForDisplay(salon) {
        console.log("current salon: " + salon.salonName)
        let appointmentIdList: number[] = []
        //console.log("the salons appointments: " + salon.appointments)
        //console.log('the length of the salons appointments: ' + salon.appointments.length)
        for ( var i = 0; i < salon.appointments.length; i++) {
            appointmentIdList.push(salon.appointments[i].id)
        }
        
        // console.log('list of appointment id: --------------');
        // console.log(appointmentIdList)

        const reviews = await this.reviewRepository.find({ relations: ['appointment', 'customer'], where: {appointment: { id: In(appointmentIdList) } } })
        // console.log('review list by appointment object result:-------------')
        // console.log(reviews)
        var reviewsToReturn = []
        let sum = 0
        for (var j = 0; j < reviews.length; j++){
            // console.log('review number: ' + j)
            const reviewFormated = {
                rating: reviews[j].rating,
                comment: reviews[j].comment,
                customer: reviews[j].customer
            }
            sum += reviews[j].rating
            reviewsToReturn.push(reviewFormated)
        }
        
        // console.log('sum is: ' + sum);
        let averageRating: number
        if (sum == 0) {
            averageRating = 0
        } else {
            averageRating = sum / reviews.length
            
        }
        
        const highlightsToReturn = salon.highLights.split(',')
        const salonTypesToReturn = salon.salonTypes.split(',') 
        const salonPhotoToReturn = salon.salonPhotos.split(',')
        const workDaysListToReturn = this.workDayStringToArray(salon.workDays)
        // const salonFormatted = this.salonRepository.create({...salon, 
        //     highLights: highlightsToReturn,
        //     salonTypes: salonTypesToReturn,
        //     workDays: workDaysListToReturn,
        //     reviews: reviewsToReturn,
        //     reviewsNumber: reviewsToReturn.length,
        //     salonRating: averageRating,
        // })
        const salonFormatted = {
            ...salon,
            highLights: highlightsToReturn,
            salonTypes: salonTypesToReturn,
            workDays: workDaysListToReturn,
            reviews: reviewsToReturn,
            reviewsNumber: reviewsToReturn.length,
            salonRating: averageRating,
        }
        // const salonFormatted = {
        //     id: salon.id,
        //     salonName: salon.salonName, 
        //     salonAddress: salon.salonAddress,
        //     highLights: highlightsToReturn,
        //     salonTypes: salonTypesToReturn,
        //     description: salon.description,
        //     workDays: workDaysListToReturn,
        //     reviews: reviewsToReturn,
        //     reviewsNumber: reviewsToReturn.length,
        //     salonRating: averageRating,
        //     //salonPhotos: salonPhotoToReturn
        //     salonPhotos: salon.salonPhotos
        // }
        
        // console.log("salon to return------------")
        // console.log(salonToReturn)
        // console.log('returning the formatted salon')
        return salonFormatted
    }
    customPagination(salons, pageSize: number, pageNumber: number){
        // console.log('page number: ' + pageNumber)
        // console.log('page size: ' + pageSize)
       
        var salonPage = []
        for (var pageStartIndex = (pageNumber - 1) * pageSize; pageStartIndex < pageSize * pageNumber; pageStartIndex++){
            // console.log('loop number: ' + pageStartIndex)
            // console.log("custom pagination salon added to page: " + salons[pageStartIndex])
            salonPage.push(salons[pageStartIndex])
            // console.log(salonList[pageStartIndex].salonRating)
        }
        return salonPage
    }
    async formatAndSortSalons(salons, sortOption?: string){
        var formattedSalons = []
        // console.log("number of salons to format:" + salons.length)
        for (var i = 0; i < salons.length; i++){
            // console.log("current formatting salon: " + salons[i].id)
            let salonToReturn = await this.formatSalonForDisplay(salons[i])
            formattedSalons.push(salonToReturn)
        }
        //salonsToReturn.sort((a, b) => a.salonRating + b.salonRating);
        // console.log("number of salons formated: " + formattedSalons.length)
        let sortedSalons = []
        if (sortOption == 'alphabetical') {
            sortedSalons = this.quickSortSalonName(formattedSalons)
        } else {
            sortedSalons = this.quickSortSalonRating(formattedSalons)
        }
        if (!sortOption) {
            // console.log("no sorting options specified, returning formatted salons with default sorting")
            // console.log("formatted and sorted by default option salon list: " + sortedSalons)
            return sortedSalons
        } else {
            // console.log("returning formatted salons sorted by options")
            // console.log("formatted and sorted by option salon list: " + sortedSalons)
            return sortedSalons
        }
    }
     
    updateWorkDay(salonWorkDay, workDayToUpdate){

        const workDayStr = workDayToUpdate.workDay + '-' + workDayToUpdate.startTime + '-' + workDayToUpdate.endTime
        const indexToFind = salonWorkDay.indexOf(workDayToUpdate.workDay)
        if (indexToFind == -1){
            if (salonWorkDay == ''){
                salonWorkDay = workDayStr
            } else {
                salonWorkDay = salonWorkDay + ',' + workDayStr
            }
            } else {
                const leftString = salonWorkDay.substring(0, indexToFind);
                const rightString = salonWorkDay.substring(indexToFind + workDayStr.length + 1);
                salonWorkDay = leftString + rightString
                if (salonWorkDay.charAt(salonWorkDay.length - 1) == ','){
                    salonWorkDay = salonWorkDay.substring(0, salonWorkDay.length - 1)
                }
    
            }
        return salonWorkDay
    }
    quickSortSalonRating(arr) {
        if (arr.length <= 1) {
          return arr;
        }
      
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
      
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].salonRating > pivot.salonRating) {
            leftArr.push(arr[i]);
          } else {
            rightArr.push(arr[i]);
          }
        }
      
        return [...this.quickSortSalonRating(leftArr), pivot, ...this.quickSortSalonRating(rightArr)];
      }
      quickSortSalonName(arr) {
        if (arr.length <= 1) {
          return arr;
        }
      
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
      
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].salonName > pivot.salonName) {
            leftArr.push(arr[i]);
          } else {
            rightArr.push(arr[i]);
          }
        }
      
        return [...this.quickSortSalonName(leftArr), pivot, ...this.quickSortSalonName(rightArr)];
      }
    quickSortSearchScore(arr) {
        if (arr.length <= 1) {
          return arr;
        }
      
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
      
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].totalSearchScore > pivot.totalSearchScore) {
            leftArr.push(arr[i]);
          } else {
            rightArr.push(arr[i]);
          }
        }
      
        return [...this.quickSortSearchScore(leftArr), pivot, ...this.quickSortSearchScore(rightArr)];
      };
    
}

