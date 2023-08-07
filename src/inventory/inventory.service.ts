import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';
import { InventoryEntity } from 'src/TypeOrms/InventoryEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity) private inventoryRepository: Repository<InventoryEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getinventories(){
        return this.inventoryRepository.find();
    }
    async getInventory(idToFind: number){
        const inventory = await this.inventoryRepository.findOneBy({id: idToFind})
        if (!inventory) throw new HttpException('the inventory with the given id  cannot be found', HttpStatus.NOT_FOUND)
        return inventory
    }

    async createInventory(salonId: number, newInventory: createInventoryDto){
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { inventories: true },
        })
        if (!salonToUpdate) throw new HttpException('salon cannot be found to add new inventory item', HttpStatus.NOT_FOUND)
     
        const inventoryToSave = this.inventoryRepository.create({...newInventory});
        const savedInventory = await this.inventoryRepository.save(inventoryToSave)
       
        salonToUpdate.inventories.push(savedInventory)
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
     
        return savedInventory
    }

    updateInventory(idToUpdate: number, updateDetails: updateInventoryDto){
        return this.inventoryRepository.update( idToUpdate, {...updateDetails})

    }
    deleteInventory(idToDelete: number){
        return this.inventoryRepository.delete( idToDelete)

    }

}
