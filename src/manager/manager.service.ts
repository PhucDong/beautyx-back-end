import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createManagerDto } from 'src/DTOs/ManagerDto';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(ManagerEntity) private managerRepository: Repository<ManagerEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    getManagers(){
        return this.managerRepository.find();
    }
    getManager(idToFind: number){
       return this.managerRepository.findOneBy({id: idToFind});
    }

    async createManager(salonId: number, newManager: createManagerDto){
        
        const salonToUpdate = await this.salonRepository.findOneBy({id: salonId})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to add new employee', HttpStatus.NOT_FOUND)
        
        const managerToSave = this.managerRepository.create({...newManager});
        console.log('this is the manager-------------created');
        console.log(managerToSave)
        const savedManager = await this.managerRepository.save(managerToSave)
       
        salonToUpdate.manager = savedManager
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
        console.log('this is the updated salon with new manager')
        console.log(updatedSalon)

        return savedManager
    }

    updateManager(idToUpdate: number, updateDetails: createManagerDto){
        return this.managerRepository.update( idToUpdate, {...updateDetails})

    }
    deleteManager(idToDelete: number){
        return this.managerRepository.delete( idToDelete)

    }

}
