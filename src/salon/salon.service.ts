import { HttpException, HttpStatus, Injectable, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSalonDto, filterSalonDto, recommendSalonDto, sortSalonDto, updateSalonDto, updateSalonReviewDto } from 'src/DTOs/SalonDto';
import { queryServiceCategoryDto, updateServiceCategoryDto } from 'src/DTOs/ServiceCategoryDto';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { DataSource, In, Repository } from 'typeorm';
import { Request } from 'express';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';

@Injectable()
export class SalonService {
    constructor(
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
        @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getSalons(){
        return this.salonRepository.find({relations: []});
    }

    // async getSortSalonsByName(currentPage: sortSalonDto){
    //     const page: number = currentPage.page || 1
    //     const perPage = 8;
    //     const offsetvalue: number = ((page-1)*perPage);

        

    //     const salons = this.salonRepository
    //     .createQueryBuilder("salon")
        
    //     const total = await salons.getCount();
        
    //     salons
    //     .skip(offsetvalue)
    //     .take(perPage)
    //     .orderBy("salon.salonName", "ASC")
    //     .addOrderBy("salon.salonAddress", "ASC")
    //     .addOrderBy("salon.averageRating",  "DESC")

    //     return {
    //         data: await salons.getMany(),
    //         total,
    //         page,
    //     }
    // }

    // async getSortSalonsByRating(currentPage: sortSalonDto){
    //     const page: number = currentPage.page || 1
    //     const perPage = 8;
    //     const offsetvalue: number = ((page-1)*perPage);

    //     const salons = this.salonRepository
    //     .createQueryBuilder("salon")
        
    //     const total = await salons.getCount();
        
    //     salons
    //     .skip(offsetvalue)
    //     .take(perPage)
    //     .orderBy("salon.averageRating",  "DESC")
    //     .addOrderBy("salon.salonName", "ASC")
    //     .addOrderBy("salon.salonAddress", "ASC")
        

    //     return {
    //         data: await salons.getMany(),
    //         total,
    //         page,
    //     }
    // }

    async queryBuilder(alias: string) {
        return this.salonRepository.createQueryBuilder(alias)
    }

    // async getFilter(keyword: filterSalonDto) {
    //     const page: number = keyword.page || 1
    //     const perPage = 8;
    //     const offsetvalue: number = ((page-1)*perPage);

    //     const salons = this.salonRepository
    //     .createQueryBuilder("salon")
        
    //     const total = await salons.getCount();
        
        
    //     salons
    //     .skip(offsetvalue)
    //     .take(perPage)
    //     .where("salon.salonType = :salonType", {salonType: keyword.keyword})
    //     .orderBy("salon.salonName", "ASC")
    //     .addOrderBy("salon.salonAddress", "ASC")

    //     const results = await salons.getCount();

    //     return {
    //         data: await salons.getMany(),
    //         total,
    //         results,
    //         page,
    //     }
    // }
    // async getFilter(keyword: string) {
    //     const filter = await this
    //     .salonRepository.find({
    //         relations: {
    //             serviceCategories: true
    //         },
    //         where: {
    //             serviceCategories: {
    //                 serviceCategoryName: keyword
    //             }
    //         }
    //     },
    //     )
        
    //     return filter
    // }

    // async getRecommendation(keyWord: recommendSalonDto) {
    //     const page: number = keyWord.page || 1
    //     const perPage = 8;
    //     const offsetvalue: number = ((page-1)*perPage);
        

    //     const salons = this.salonRepository
    //     .createQueryBuilder("salon")
        
    //     const total = await salons.getCount();

    //     // salons
    //     // .relation(SalonEntity, "reviews")
    //     // .of(salons)
    //     // .add()

    //     salons
    //     .skip(offsetvalue)
    //     .take(perPage)
    //     .orderBy("salon.averageRating", "DESC")
    //     .addOrderBy("salon.salonName", "ASC")
    //     .addOrderBy("salon.salonAddress", "ASC")

    //     const results = await salons.getCount();

    //     return {
    //         data: await salons.getMany(),
    //         total,
    //         results,
    //         page,
    //     }
    // }

    // async getFilterByRating(keyWord: filterSalonRatingDto) {
    //     const page: number = keyWord.page || 1
    //     const perPage = 8;
    //     const offsetvalue: number = ((page-1)*perPage);
        

    //     const salons = this.salonRepository
    //     .createQueryBuilder("salon")
        
    //     const total = await salons.getCount();

    //     // salons
    //     // .relation(SalonEntity, "reviews")
    //     // .of(salons)
    //     // .add()

        

    //     salons
    //     .skip(offsetvalue)
    //     .take(perPage)
    //     .where("salon.averageRating = :averageRating", {averageRating: keyWord.rating})
    //     .orderBy("salon.averageRating", "DESC")
    //     .addOrderBy("salon.salonName", "ASC")
    //     .addOrderBy("salon.salonAddress", "ASC")

    //     const results = await salons.getCount();

    //     return {
    //         data: await salons.getMany(),
    //         total,
    //         results,
    //         page,
    //     }
    // }

    async searchSalonQuery(searchKey: string, pageSize: number, pageNumber: number){
        const salons = await this.salonRepository.find({relations: ['serviceCategories']});

        if (searchKey.length == 0) throw new HttpException('the search keyword cannot be empty', HttpStatus.BAD_REQUEST)

        searchKey = searchKey.toLowerCase();

        const searchKeyList = searchKey.split(' ')
        console.log("list of keys to find in query")
        console.log(searchKeyList)

        var foundList = []

        for (var i = 0; i < salons.length; i++){
            //console.log('search loop: ' + i)
            const salonToSearch = salons[i]
            // console.log("salon being searched")
            //console.log(salonToSearch)
            var searchkeyFound = 0;
            var totalSearchScore = 0;
            for (var k = 0; k < searchKeyList.length; k++){
                // console.log('search key loop number: ' + k)
                const searchKey = searchKeyList[k]
                    
                var startIndex = 0, index: number, salonNameIndices = [], salonAddressIndices = [], salonServiceCategoryIndices = [];
                while ((index = salonToSearch.salonName.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonNameIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                startIndex = 0
                while ((index = salonToSearch.salonAddress.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonAddressIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                
                var categoryScore = 0
                for ( var j = 0; j < salonToSearch.serviceCategories.length; j++){
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

                // if (salonNameIndices.length != 0) console.log('found result in salon names-------')
                // if (salonAddressIndices.length != 0) console.log('found result in salon address-------')
                // if (categoryScore != 0) console.log('found result in salon categories-------')

                const resultScore = salonNameIndices.length + salonAddressIndices.length + categoryScore
                if (resultScore != 0) {
                    searchkeyFound++
                    totalSearchScore += resultScore
                    //console.log("number of search key found: " + searchkeyFound)
                }
            }
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
        
        foundList.sort((salonA, salonB) => salonA.totalSearchScore + salonB.totalSearchScore);
        //console.log(foundList)
        var salonPage = []
        console.log('page number: ' + pageNumber)
        console.log('page size: ' + pageSize)
        for (var pageStartIndex = (pageNumber - 1) * pageSize; pageStartIndex < pageSize * pageNumber; pageStartIndex++){
            console.log('loop number: ' + pageStartIndex)
            salonPage.push(foundList[pageStartIndex])
        }
        //console.log(salonPage)
        return salonPage
        
    }

    getSalon(idToFind: number){
       return this.salonRepository.findOneBy({id: idToFind});
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

    getSalonReviews(idToFind: number) {
        return this.salonRepository.findOne({relations: ['reviews'], where: {id: idToFind}});
    }
  
    createSalon(newSalon: createSalonDto){
        const salonToSave = this.salonRepository.create({...newSalon});
        return this.salonRepository.save(salonToSave)
    }

    updateSalon(idToUpdate: number, updateDetails: updateSalonDto){
        return this.salonRepository.update( idToUpdate, {...updateDetails})
    }

    async updateSalonReview(idToUpdate: number, updateDetails: updateSalonReviewDto) {
        const salonToUpdate = await this.salonRepository.findOne({relations: ['reviews'], where: {id: idToUpdate}})
        const reviews = await this.reviewRepository.find({where: {id: In(updateDetails.reviews)}})
        salonToUpdate.reviews = reviews

        return this.salonRepository.save(salonToUpdate)
    }

    deleteSalon(idToDelete: number){
        return this.salonRepository.delete( idToDelete)

    }
}
