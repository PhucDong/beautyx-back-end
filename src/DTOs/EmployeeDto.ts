import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"

export class createEmployeeDto{
    //user section
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

    //employee section

    @IsNotEmpty()
    job: string

    @IsNotEmpty()
    startTime: Date

    @IsNotEmpty()
    endTime: Date

    @IsNotEmpty()
    @IsNumber()
    salary: number
    
    experience: string

 
 
}   
export class updateEmployeeDto{
    //user section
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

    //employee section

    job: string

    startTime: Date

    endTime: Date
    @IsNumber()
    salary: number
    
    experience: string
    @IsNumber()
    pastAppointment: number

    @IsNumber()
    rating: number
 
}   