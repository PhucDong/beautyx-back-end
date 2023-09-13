import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';
import { InventoryEntity } from 'src/TypeOrms/InventoryEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';
export declare class InventoryService {
    private inventoryRepository;
    private salonRepository;
    constructor(inventoryRepository: Repository<InventoryEntity>, salonRepository: Repository<SalonEntity>);
    getinventories(): Promise<InventoryEntity[]>;
    getInventory(idToFind: number): Promise<InventoryEntity>;
    createInventory(salonId: number, newInventory: createInventoryDto): Promise<InventoryEntity>;
    updateInventory(idToUpdate: number, updateDetails: updateInventoryDto): Promise<import("typeorm").UpdateResult>;
    deleteInventory(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
