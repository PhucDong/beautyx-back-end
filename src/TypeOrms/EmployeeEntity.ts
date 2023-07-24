import { Entity, Column, OneToMany, ManyToOne } from "typeorm"
import { AppointmentEntity } from "./AppointmentEntity"
import { Profile } from "./Profile"
import { SalonEntity } from "./SalonEntity"


@Entity()
export class EmployeeEntity extends Profile{

    @Column({
        nullable: false
    })
    job: string

    @Column({
        nullable: false,
        type: 'time'
    })
    startTime: Date

    @Column({
        nullable: false,
        type: 'time'
    })
    endTime: Date
    
    @Column()
    workDays: string

    @Column({
        nullable: false
    })
    salary: number

    @Column()
    experience: string

    @Column({
        default: 0
    })
    pastAppointment: number

    @Column({
        default: 0
    })
    rating: number

    //@PrimaryColumn({ type: 'int', name: 'userId'})
    // @OneToOne(() => UserEntity, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    // })
    //@JoinColumn({ name: "user_id"})


    @OneToMany(() => AppointmentEntity, (appointment) => appointment.employee)
    appointments: AppointmentEntity[]

    @ManyToOne(() => SalonEntity, (salon) => salon.employees)
    salon: SalonEntity
}   