import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./CustomerEntity";
import { AppointmentEntity } from "./AppointmentEntity";

@Entity()
export class ReviewEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;
   

    @Column()
    rating: number
    
    @Column()
    comment: string
    
    @ManyToOne(() => CustomerEntity, (customer) => customer.reviews)
    customer: CustomerEntity

    
    

}