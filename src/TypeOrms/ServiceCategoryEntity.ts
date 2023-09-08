import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ServiceEntity } from "./ServiceEntity";
import { SalonEntity } from "./SalonEntity";

@Entity()
export class ServiceCategoryEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number
    
    @Column()
    serviceCategoryName: string

    @OneToMany(() => ServiceEntity, (serivce) => serivce.serviceCategory
    ,{ 
        onDelete: 'CASCADE' 
    }
    )
    services: ServiceEntity[]

    @ManyToOne(() => SalonEntity, (salon) => salon.serviceCategories
    ,{ 
        onDelete: 'CASCADE' 
    }
    )
    salon: SalonEntity

}