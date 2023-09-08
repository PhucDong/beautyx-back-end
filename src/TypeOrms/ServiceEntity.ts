import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceCategoryEntity } from "./ServiceCategoryEntity";

@Entity()
export class ServiceEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;

    @Column()
    serviceName: string

    @Column({
        type: 'time'
    })
    duration: Date

    @Column()
    price: number

    @Column()
    description: string

    @ManyToOne(() => ServiceCategoryEntity, (serviceCategory) => serviceCategory.services
    // ,{ 
    //     onDelete: 'CASCADE' 
    // }
    )
    serviceCategory: ServiceCategoryEntity


}