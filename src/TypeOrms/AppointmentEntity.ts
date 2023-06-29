import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./CustomerEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { SalonEntity } from "./SalonEntity";
import { ServiceEntity } from "./ServiceEntity";
import { ReviewEntity } from "./ReviewEntity";

@Entity()
export class AppointmentEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;
    
    @Column({
        default: false
    })
    approvalStatus: boolean

    @ManyToOne(() => SalonEntity, (salon) => salon.appointments)
    salon: SalonEntity
    
    @ManyToOne(() => CustomerEntity, (customer) => customer.appointments)
    customer: CustomerEntity

    @ManyToOne(() => EmployeeEntity, (employee) => employee.appointments)
    employee: EmployeeEntity

    @ManyToMany(() => ServiceEntity)
    @JoinTable()
    services: ServiceEntity[]

    @OneToOne(() => ReviewEntity)
    @JoinColumn()
    review: ReviewEntity
  
}