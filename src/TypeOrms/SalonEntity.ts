import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { AppointmentEntity } from "./AppointmentEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { InventoryEntity } from "./InventoryEntity";
import { ManagerEntity } from "./ManagerEntity";
import { ServiceCategoryEntity } from "./ServiceCategoryEntity";
import { ReviewEntity } from "./ReviewEntity";
import { SalonTypeEnum } from "src/constants";


@Entity()
export class SalonEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;
    
    @Column()
    salonName: string

    @Column()
    salonAddress: string
    
    @Column()
    workDays: string

    @Column()
    highLights: string

    @Column()
    description: string

    @Column()
    salonTypes: string;

    @Column({
        nullable:true
    })
    salonPhotos: string;
    
    @OneToMany(() => ServiceCategoryEntity, (serivceCategories) => serivceCategories.salon)
    serviceCategories: ServiceCategoryEntity[]

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.salon)
    appointments: AppointmentEntity[]

    @OneToMany(() => InventoryEntity, (inventory) => inventory.salon)
    inventories: InventoryEntity[]

    @OneToMany(() => EmployeeEntity, (employee) => employee.salon)
    employees: EmployeeEntity[]

    @OneToOne(() => ManagerEntity, (manager) => manager.salon
        ,{ 
            // onDelete: 'CASCADE' 
            // nullable: true
        }
    )
    // @JoinColumn()
    manager: ManagerEntity

    // @ManyToMany(() => ReviewEntity)
    // @JoinTable()
    // reviews: ReviewEntity[]
    
}