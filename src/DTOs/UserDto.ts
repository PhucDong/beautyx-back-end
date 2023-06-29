import { IsEmail, IsEnum, IsNotEmpty } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"

export class createUserDto{
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
}

export class updateUserDto{
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
}