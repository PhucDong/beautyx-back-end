import { IsEmail, IsEnum, IsNotEmpty } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"

export class createManagerDto{

    //profile section

    @IsNotEmpty()
    fisrtname: string
    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    dateOfBirth: Date

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    address: string
    
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: GenderEnum

    //manager section


}

export class updateUserDto{

    //profile section

    fisrtname: string
    lastname: string

    @IsEmail()
    email: string

    phone: string

    DateOfBirth: Date

    city: string

    address: string
    
    @IsEnum(GenderEnum)
    gender: GenderEnum

    //manager section
    
}