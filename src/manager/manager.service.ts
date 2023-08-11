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
    async getManager(idToFind: number){
        const manager = await this.managerRepository.findOneBy({id: idToFind})
        if (!manager) throw new HttpException('manager with the given id cannot be found', HttpStatus.NOT_FOUND)
        return manager
    }
    async getManagerByEmail(emailToFind: string){
        const manager = await this.managerRepository.findOneBy({email: emailToFind})
        if (!manager) throw new HttpException('manager with the given email cannot be found', HttpStatus.NOT_FOUND)
        
        return manager
    }
    async createManager(salonId: number, newManager: createManagerDto){
        
        const salonToUpdate = await this.salonRepository.findOneBy({id: salonId})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to add new employee', HttpStatus.NOT_FOUND)
        
        const managerToSave = this.managerRepository.create({...newManager});
        // console.log('this is the manager-------------created');
        // console.log(managerToSave)
        const savedManager = await this.managerRepository.save(managerToSave)
       
        salonToUpdate.manager = savedManager
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
        console.log('this is the updated salon with new manager')
        // console.log(updatedSalon)

        return savedManager
    }

    updateManager(idToUpdate: number, updateDetails: createManagerDto){
        return this.managerRepository.update( idToUpdate, {...updateDetails})

    }
    deleteManager(idToDelete: number){
        return this.managerRepository.delete( idToDelete)

    }

}
