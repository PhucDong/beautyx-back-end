import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { AppointmentEntity } from "./AppointmentEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { InventoryEntity } from "./InventoryEntity";
import { ManagerEntity } from "./ManagerEntity";
import { ServiceCategoryEntity } from "./ServiceCategoryEntity";
import { ReviewEntity } from "./ReviewEntity";


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
    
    @Column({
        type: 'time'
    })
    startTime: Date

    @Column({
        type: 'time'
    })
    endTime: Date

    @OneToMany(() => ServiceCategoryEntity, (serivceCategories) => serivceCategories.salon)
    serviceCategories: ServiceCategoryEntity[]

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.salon)
    appointments: AppointmentEntity[]

    @OneToMany(() => InventoryEntity, (inventory) => inventory.salon)
    inventories: InventoryEntity[]

    @OneToMany(() => EmployeeEntity, (employee) => employee.salon)
    employees: EmployeeEntity[]

    @OneToOne(() => ManagerEntity)
    @JoinColumn()
    manager: ManagerEntity

    @ManyToMany(() => ReviewEntity)
    @JoinTable()
    reviews: ReviewEntity[]
    
}