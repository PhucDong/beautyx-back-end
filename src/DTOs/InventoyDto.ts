import { IsNotEmpty, IsNumber } from "class-validator"
import { SalonEntity } from "src/TypeOrms/SalonEntity"

export class createInventoryDto {

    @IsNotEmpty()
    inventoryName: string

    @IsNumber()
    inventoryQuantity: number

    @IsNumber()
    inventoryVolume: number

}
export class updateInventoryDto {
    
    inventoryName: string
    
    @IsNumber()
    inventoryQuantity: number

    @IsNumber()
    inventoryVolume: number

    salon: SalonEntity

}