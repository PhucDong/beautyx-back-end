import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { ReviewEntity } from "./ReviewEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { Profile } from "./Profile";
import { SalonEntity } from "./SalonEntity";

@Entity()
export class CustomerEntity extends Profile{

    @Column({
        default: () => '(CURRENT_DATE)'
    })
    lastActivity: Date
    
    @Column({
        default: 0
    })
    serviceUsageTime: number

    @OneToMany(() => ReviewEntity, (review) => review.customer)
    reviews: ReviewEntity[]

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.customer)
    appointments: AppointmentEntity[]
    
    @ManyToMany(() => SalonEntity)
    @JoinTable()
    salons: SalonEntity[]

}