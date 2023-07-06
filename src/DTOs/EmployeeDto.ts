import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsNumberString, Matches } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"

export class createEmployeeDto{
    //user section
    @IsNotEmpty()
    firstname: string

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

    //employee section

    @IsNotEmpty()
    job: string

    @IsNotEmpty()
    workDays: string

    //@Matches(/^(1[0-2]|0?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

    @IsNumber()
    salary: number
    
    experience: string

 
 
}   
export class updateEmployeeDto{
    //user section
    fisrtnames: string

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

    //employee section

    job: string
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

    workDays: string

    @IsNumber()
    salary: number
    
    experience: string

    //@IsNumber()
    pastAppointment: number

    //@IsNumber()
    rating: number
 
}   

export class updateEmployeeWorkDayDto {

    @IsNotEmpty()
    workDays: string

}

export class getEmployeesAvailableDto {

    @IsDateString()
    appointmentDate: Date

    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

   
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    estimatedEndTime: Date

}