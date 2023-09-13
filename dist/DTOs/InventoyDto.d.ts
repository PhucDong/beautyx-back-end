import { SalonEntity } from "src/TypeOrms/SalonEntity";
export declare class createInventoryDto {
    inventoryName: string;
    inventoryQuantity: number;
    inventoryVolume: number;
}
export declare class updateInventoryDto {
    inventoryName: string;
    inventoryQuantity: number;
    inventoryVolume: number;
    salon: SalonEntity;
}
