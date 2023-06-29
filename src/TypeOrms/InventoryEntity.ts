import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SalonEntity } from "./SalonEntity"

@Entity()
export class InventoryEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;
    
    @Column()
    inventoryName: string

    @Column()
    inventoryQuantity: number

    @Column()
    inventoryVolume: number

    @ManyToOne(() => SalonEntity, (salon) => salon.inventories)
    salon: SalonEntity
}