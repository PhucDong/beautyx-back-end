import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumberString } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"

export class createManagerDto{

    //profile section

    @IsNotEmpty()
    fisrtname: string

    @IsNotEmpty()
    lastname: string

    @IsEmail()
    email: string

    @IsNumberString()
    phone: string

    @IsDateString()
    dateOfBirth: Date

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    address: string
    
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

    @IsNumberString()
    phone: string
    
    @IsDateString()
    dateOfBirth: Date

    city: string

    address: string
    
    @IsEnum(GenderEnum)
    gender: GenderEnum

    //manager section
    
}