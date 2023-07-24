import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createServiceCategoryDto, updateServiceCategoryDto } from 'src/DTOs/ServiceCategoryDto';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceCategoryService {
    constructor(
        @InjectRepository(ServiceCategoryEntity) private serviceCategoryRepository: Repository<ServiceCategoryEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getServiceCategories(){
        return this.serviceCategoryRepository.find({relations: ['services']});
    }
    getServiceCategory(idToFind: number){
       return this.serviceCategoryRepository.findOneBy({id: idToFind});
    }
    getServiceCategoryServices(idToFind: number){
        return this.serviceCategoryRepository.findOne({relations: ['services'], where: {id: idToFind}});
    }
    
    async createServiceCategory(salonId: number, newCategory: createServiceCategoryDto){

        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { serviceCategories: true },
        })
        if (!salonToUpdate) throw new HttpException('salon cannot be found to add new category', HttpStatus.NOT_FOUND)
     
        const categoryToSave = this.serviceCategoryRepository.create({...newCategory});
        const savedCategory = await this.serviceCategoryRepository.save(categoryToSave)
       
        salonToUpdate.serviceCategories.push(savedCategory)
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
     
        return savedCategory

    }

    updateServiceCategory(idToUpdate: number, updateDetails: updateServiceCategoryDto){
        return this.serviceCategoryRepository.update( idToUpdate, {...updateDetails})

    }
    deleteServiceCategory(idToDelete: number){
        return this.serviceCategoryRepository.delete( idToDelete)

    }

}
