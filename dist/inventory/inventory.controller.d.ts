import { InventoryService } from './inventory.service';
import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getinventories(): Promise<import("../TypeOrms/InventoryEntity").InventoryEntity[]>;
    getInventory(idToFind: number): Promise<import("../TypeOrms/InventoryEntity").InventoryEntity>;
    createInventory(salonId: number, newInventory: createInventoryDto): Promise<import("../TypeOrms/InventoryEntity").InventoryEntity>;
    updateInventory(idToUpdate: number, updateDetails: updateInventoryDto): Promise<import("typeorm").UpdateResult>;
    deleteInventory(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
