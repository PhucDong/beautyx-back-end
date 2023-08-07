import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SalonEntity } from "./SalonEntity";
import { Profile } from "./Profile";

@Entity()
export class ManagerEntity extends Profile{
    @Column({
        nullable: false,
        //unique: true
    })
    password: string
    
}