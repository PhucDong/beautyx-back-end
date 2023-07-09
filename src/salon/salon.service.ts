import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        return this.salonRepository.find({relations: []});
    }
    async getSalon(idToFind: number){
        const salon = await this.salonRepository.findOneBy({id: idToFind});
        if (!salon) throw new HttpException('the salon with the given id cannot be found', HttpStatus.NOT_FOUND)
        return salon
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
