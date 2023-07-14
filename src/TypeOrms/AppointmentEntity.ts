import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./CustomerEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { SalonEntity } from "./SalonEntity";
import { ServiceEntity } from "./ServiceEntity";
import { ReviewEntity } from "./ReviewEntity";

export enum ApprovalStatusEnum {
    APPROVED = 'approved',
    DENIED = 'denied',
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
  }

@Entity()
export class AppointmentEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;

    @Column()
    appointmentDate: Date

    @Column({
        type: 'time'
    })
    startTime: Date

    @Column({
        type: 'time',
        nullable: true
    })
    endTime: Date

    @Column({
        type: 'time'
    })
    estimatedEndTime: Date

    @Column({
        type: 'enum',
        enum: ApprovalStatusEnum,
        default: ApprovalStatusEnum.PENDING
    })
    approvalStatus: ApprovalStatusEnum
 
    @ManyToOne(() => SalonEntity, (salon) => salon.appointments)
    salon: SalonEntity
    
    @ManyToOne(() => CustomerEntity, (customer) => customer.appointments)
    customer: CustomerEntity

    @ManyToOne(() => EmployeeEntity, (employee) => employee.appointments)
    employee: EmployeeEntity

    @ManyToMany(() => ServiceEntity)
    @JoinTable()
    services: ServiceEntity[]

    @OneToOne(() => ReviewEntity, (review) => review.appointment)
    @JoinColumn()
    review: ReviewEntity
  
}