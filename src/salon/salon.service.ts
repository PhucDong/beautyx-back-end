import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSalonDto, searchSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SalonService {
    constructor(
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
        @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
        ) {}

    
    getSalons(){
        return this.salonRepository.find({relations: ['reviews', 'appointments']});
    }
    async getSalon(idToFind: number){
        const salon = await this.salonRepository.findOne({relations: ['appointments'], where: {id: idToFind}});
        if (!salon) throw new HttpException('the salon with the given id cannot be found', HttpStatus.NOT_FOUND)

        let appointmentIdList: number[] = []

        for ( var i = 0; i < salon.appointments.length; i++) {
            appointmentIdList.push(salon.appointments[i].id)
        }
        
        // console.log('list of appointment id: --------------');
        // console.log(appointmentIdList)

        const reviews = await this.reviewRepository.find({ relations: ['appointment', 'customer'], where: {appointment: { id: In(appointmentIdList) } } })
        // console.log('review list by appointment object result:-------------')
        // console.log(reviews)
        var reviewsToReturn = []
        for (var i = 0; i < reviews.length; i++){
            const reviewFormated = {
                rating: reviews[i].rating,
                comment: reviews[i].comment,
                customer: reviews[i].customer
            }
            reviewsToReturn.push(reviewFormated)
        }
        const highlightsToReturn = salon.highLights.split(',')

        var workDaysListToReturn = this.workDayStringToArray(salon.workDays)

        const salonToReturn = {
            salonName: salon.salonName, 
            salonAddress: salon.salonAddress,
            highLights: highlightsToReturn,
            description: salon.description,
            workDays: workDaysListToReturn,
            reviews: reviewsToReturn
        }
        // console.log("salon to return------------")
        // console.log(salonToReturn)

        return salonToReturn

        
        
        

    }
    async searchSalon(searchKey: searchSalonDto){
        const salons = await this.salonRepository.find({relations: ['serviceCategories']});

        if (searchKey.searchStr.length == 0) throw new HttpException('the search keyword cannot be empty', HttpStatus.BAD_REQUEST)

        const searchKeyList = searchKey.searchStr.split(' ')
        console.log("list of keys to find")
        console.log(searchKeyList)

        

            // if (!caseSensitive) {
            //     str = str.toLowerCase();
            //     searchStr = searchStr.toLowerCase();
            // }

        var foundList = []

        for (var i = 0; i < salons.length; i++){
            const salonToSearch = salons[i]
            // console.log("salon being searched")
            //console.log(salonToSearch)
            var searchkeyFound = 0;
            var totalSearchScore = 0;
            for (var k = 0; k < searchKeyList.length; k++){
                // console.log('search key loop number: ' + k)
                const searchKey = searchKeyList[k]
                    
                var startIndex = 0, index: number, salonNameIndices = [], salonAddressIndices = [], salonServiceCategoryIndices = [];
                while ((index = salonToSearch.salonName.indexOf(searchKey, startIndex)) > -1) {
                    salonNameIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                startIndex = 0
                while ((index = salonToSearch.salonAddress.indexOf(searchKey, startIndex)) > -1) {
                    salonAddressIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                var categoryScore = 0
                for ( var j = 0; j < salonToSearch.serviceCategories.length; j++){
                    const categoryToSearch = salonToSearch.serviceCategories[j]
                    var categoryStartIndex = 0, categoryIndices = []
                    while ((index = categoryToSearch.serviceCategoryName.indexOf(searchKey, categoryStartIndex)) > -1) {
                        categoryIndices.push(index);
                        categoryStartIndex = index + searchKey.length;
                    }
                    //if (categoryIndices.length != 0) console.log('found result in service categories number: ' + j + ' -------------------')

                    salonServiceCategoryIndices.push(categoryIndices)
                    categoryScore += categoryIndices.length
                }

                // if (salonNameIndices.length != 0) console.log('found result in salon names-------')
                // if (salonAddressIndices.length != 0) console.log('found result in salon address-------')
                // if (categoryScore != 0) console.log('found result in salon categories-------')

                const resultScore = salonNameIndices.length + salonAddressIndices.length + categoryScore
                if (resultScore != 0) {
                    searchkeyFound++
                    totalSearchScore += resultScore
                    // console.log("number of search key found: " + searchkeyFound)
                }
            }
            // if (searchkeyFound == searchKeyList.length) {
            //     // console.log('search key found match number of search key')
            //     const salonFound = {...salonToSearch, totalSearchScore}
            //     foundList.push(salonFound)
                
            // }
            if (searchkeyFound != 0) {
                const salonFound = {...salonToSearch, totalSearchScore}
                foundList.push(salonFound)
                
            }
        }

        foundList.sort((a, b) => a.totalSearchScore + b.totalSearchScore);

        return foundList
        
    }
    async searchSalonQuery(searchKey: string){
        const salons = await this.salonRepository.find({relations: ['serviceCategories']});

        if (searchKey.length == 0) throw new HttpException('the search keyword cannot be empty', HttpStatus.BAD_REQUEST)

        const searchKeyList = searchKey.split(' ')
        console.log("list of keys to find")
        console.log(searchKeyList)

        

            // if (!caseSensitive) {
            //     str = str.toLowerCase();
            //     searchStr = searchStr.toLowerCase();
            // }

        var foundList = []

        for (var i = 0; i < salons.length; i++){
            const salonToSearch = salons[i]
            // console.log("salon being searched")
            //console.log(salonToSearch)
            var searchkeyFound = 0;
            var totalSearchScore = 0;
            for (var k = 0; k < searchKeyList.length; k++){
                // console.log('search key loop number: ' + k)
                const searchKey = searchKeyList[k]
                    
                var startIndex = 0, index: number, salonNameIndices = [], salonAddressIndices = [], salonServiceCategoryIndices = [];
                while ((index = salonToSearch.salonName.indexOf(searchKey, startIndex)) > -1) {
                    salonNameIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                startIndex = 0
                while ((index = salonToSearch.salonAddress.indexOf(searchKey, startIndex)) > -1) {
                    salonAddressIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                var categoryScore = 0
                for ( var j = 0; j < salonToSearch.serviceCategories.length; j++){
                    const categoryToSearch = salonToSearch.serviceCategories[j]
                    var categoryStartIndex = 0, categoryIndices = []
                    while ((index = categoryToSearch.serviceCategoryName.indexOf(searchKey, categoryStartIndex)) > -1) {
                        categoryIndices.push(index);
                        categoryStartIndex = index + searchKey.length;
                    }
                    //if (categoryIndices.length != 0) console.log('found result in service categories number: ' + j + ' -------------------')

                    salonServiceCategoryIndices.push(categoryIndices)
                    categoryScore += categoryIndices.length
                }

                // if (salonNameIndices.length != 0) console.log('found result in salon names-------')
                // if (salonAddressIndices.length != 0) console.log('found result in salon address-------')
                // if (categoryScore != 0) console.log('found result in salon categories-------')

                const resultScore = salonNameIndices.length + salonAddressIndices.length + categoryScore
                if (resultScore != 0) {
                    searchkeyFound++
                    totalSearchScore += resultScore
                    // console.log("number of search key found: " + searchkeyFound)
                }
            }
            // if (searchkeyFound == searchKeyList.length) {
            //     // console.log('search key found match number of search key')
            //     const salonFound = {...salonToSearch, totalSearchScore}
            //     foundList.push(salonFound)
                
            // }
            if (searchkeyFound != 0) {
                const salonFound = {...salonToSearch, totalSearchScore}
                foundList.push(salonFound)
                
            }
        }

        foundList.sort((a, b) => a.totalSearchScore + b.totalSearchScore);

        return foundList
        
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
        
        const salonToSave = this.salonRepository.create({...newSalon, workDays});
        
        return this.salonRepository.save(salonToSave)
    }

    updateSalon(idToUpdate: number, updateDetails: updateSalonDto){
        return this.salonRepository.update( idToUpdate, {...updateDetails})

    }
    async updateSalonHighLights(idToUpdate: number, updateDetails: updateSalonHighLightsDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s highlights', HttpStatus.NOT_FOUND)
        
        const indexToFind = salonToUpdate.highLights.indexOf(updateDetails.highLights)
        if (indexToFind == -1){
            if (salonToUpdate.highLights == ''){
                salonToUpdate.highLights = updateDetails.highLights
            } else {
                salonToUpdate.highLights = salonToUpdate.highLights + ',' + updateDetails.highLights
            }
        } else {
            const leftString = salonToUpdate.highLights.substring(0, indexToFind);
            const rightString = salonToUpdate.highLights.substring(indexToFind + updateDetails.highLights.length + 1);
            salonToUpdate.highLights = leftString + rightString
            if (salonToUpdate.highLights.charAt(salonToUpdate.highLights.length - 1) == ','){
                salonToUpdate.highLights = salonToUpdate.highLights.substring(0, salonToUpdate.highLights.length - 1)
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
        
        const workDayStr = updateDetails.workDay + '-' + updateDetails.startTime + '-' + updateDetails.endTime
        const indexToFind = salonToUpdate.workDays.indexOf(updateDetails.workDay)
        if (indexToFind == -1){
            if (salonToUpdate.workDays == ''){
                salonToUpdate.workDays = workDayStr
            } else {
                salonToUpdate.workDays = salonToUpdate.workDays + ',' + workDayStr
            }
        } else {
            const leftString = salonToUpdate.workDays.substring(0, indexToFind);
            const rightString = salonToUpdate.workDays.substring(indexToFind + workDayStr.length + 1);
            salonToUpdate.workDays = leftString + workDayStr + ',' + rightString
            if (salonToUpdate.workDays.charAt(salonToUpdate.workDays.length - 1) == ','){
                salonToUpdate.workDays = salonToUpdate.workDays.substring(0, salonToUpdate.workDays.length - 1)
            }

        }
        return this.salonRepository.save(salonToUpdate);

    }
    async updateSalonWorkDayList(idToUpdate: number, updateDetails: updateSalonWorkDayListDto){
        const salonToUpdate = await this.salonRepository.findOne({where: {id: idToUpdate}})
        if (!salonToUpdate) throw new HttpException('the salon with the given id cannot be found to update it\'s workday', HttpStatus.NOT_FOUND)

        // var [day, startTime, endTime] = updateDetails.workDay.split('-')
        // var timeFormat: RegExp = /^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/;

        // if (timeFormat.test(startTime) == false) throw new HttpException("the start time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        // if (timeFormat.test(endTime) == false) throw new HttpException("the end time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        for (var i = 0; i < updateDetails.workDayList.length; i++ ){
            const currentWorkDay = updateDetails.workDayList[i]
            const workDayStr = currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime
            const indexToFind = salonToUpdate.workDays.indexOf(currentWorkDay.workDay)
            if (indexToFind == -1){
                if (salonToUpdate.workDays == ''){
                    salonToUpdate.workDays = workDayStr
                } else {
                    salonToUpdate.workDays = salonToUpdate.workDays + ',' + workDayStr
                }
            } else {
                const leftString = salonToUpdate.workDays.substring(0, indexToFind);
                const rightString = salonToUpdate.workDays.substring(indexToFind + workDayStr.length + 1);
                salonToUpdate.workDays = leftString + workDayStr + ',' + rightString
                if (salonToUpdate.workDays.charAt(salonToUpdate.workDays.length - 1) == ','){
                    salonToUpdate.workDays = salonToUpdate.workDays.substring(0, salonToUpdate.workDays.length - 1)
                }
    
            }
        }
        
        return this.salonRepository.save(salonToUpdate);

    }
    deleteSalon(idToDelete: number){
        return this.salonRepository.delete( idToDelete)

    }

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
    
}

