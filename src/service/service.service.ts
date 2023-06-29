import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createServiceDto, updateServiceDto } from 'src/DTOs/ServiceDto';

import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity) private serviceRepository: Repository<ServiceEntity>,
        @InjectRepository(ServiceCategoryEntity) private categoryRepository: Repository<ServiceCategoryEntity>
        ) {}

    
    getServices(){
        return this.serviceRepository.find({relations: []});
    }
    getService(idToFind: number){
       return this.serviceRepository.findOneBy({id: idToFind});
    }

    async createService(categoryId: number, newService: createServiceDto){
        
        const categoryToUpdate = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: { services: true },
        })
        if (!categoryToUpdate) throw new HttpException('service category cannot be found to add new service', HttpStatus.NOT_FOUND)
     
        const serviceToSave = this.serviceRepository.create({...newService});
        const savedService = await this.serviceRepository.save(serviceToSave)
       
        categoryToUpdate.services.push(savedService)
        const updatedCategory = await this.categoryRepository.save(categoryToUpdate)
        
        return savedService
    }
    updateService(idToUpdate: number, updateDetails: updateServiceDto){
        return  this.serviceRepository.update( idToUpdate, {...updateDetails});

    }
    
    deleteService(idToDelete: number){
        return this.serviceRepository.delete( idToDelete)

    }
}
