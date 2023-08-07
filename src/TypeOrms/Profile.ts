import { Exclude } from "class-transformer";
import { RoleEnum } from "src/Custom Decorator/roles.decorator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    OTHERS = 'others'
  }

export abstract class Profile {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })    
    id: number;
    
    
    @Column({
        //name: 'User-Name',
        nullable: false,
        //default: '',
        //unique: true
    })
    firstname: string

    @Column({
        nullable: false,
        //default: '',
        //unique: true
    })
    lastname: string

    @Column({
        nullable: false,
        unique: true
        //default: '',
    })
    email: string
    

    

    @Column({
        nullable: true,
        unique: true
        //default: '',
    })
    phone: string

    @Column({
        name: 'Birth',
        nullable: true,
        //default: new Date(),
    })
    dateOfBirth: Date

    @Column({
        nullable: true,
        //unique: true
        //default: '',
    })
    city: string

    @Column({
        name:'Address',
        nullable: true,
        //unique: true
        //default: '',
    })
    address: string

    @Column({
        nullable: true,
        type: 'enum',
        enum: GenderEnum,
        //default: GenderEnum.OTHERS
    })
    gender: GenderEnum

    @Column({
        nullable: true,
        type: 'enum',
        enum: RoleEnum,
    })
    roles: RoleEnum[];
   

}