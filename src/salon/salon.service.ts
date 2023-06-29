import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSalonDto, updateSalonDto } from 'src/DTOs/SalonDto';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';

@Injectable()
export class SalonService {
    constructor(
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getSalons(){
        return this.salonRepository.find({relations: ['employees']});
    }
    getSalon(idToFind: number){
       return this.salonRepository.findOneBy({id: idToFind});
    }

    createSalon(newSalon: createSalonDto){
        const salonToSave = this.salonRepository.create({...newSalon});
        return this.salonRepository.save(salonToSave)
    }

    updateSalon(idToUpdate: number, updateDetails: updateSalonDto){
        return this.salonRepository.update( idToUpdate, {...updateDetails})

    }
    deleteSalon(idToDelete: number){
        return this.salonRepository.delete( idToDelete)

    }
}
