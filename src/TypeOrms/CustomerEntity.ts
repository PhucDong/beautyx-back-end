import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { ReviewEntity } from "./ReviewEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { Profile } from "./Profile";
import { SalonEntity } from "./SalonEntity";
import { RoleEnum } from "src/Custom Decorator/roles.decorator";

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

    @Column()
    customerPhotos: string;

    @OneToMany(() => ReviewEntity, (review) => review.customer)
    reviews: ReviewEntity[]

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.customer)
    appointments: AppointmentEntity[]
    
    @ManyToMany(() => SalonEntity)
    @JoinTable()
    salons: SalonEntity[]
    
    @Column({
        nullable: false,
        //unique: true
    })
    password: string



}