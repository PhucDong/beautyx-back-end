import { IsDateString, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsNumberString } from "class-validator"
import { RoleEnum } from "src/Custom Decorator/roles.decorator"
import { GenderEnum } from "src/TypeOrms/Profile"
import { SalonEntity } from "src/TypeOrms/SalonEntity"

export class createCustomerDto{
    //user section
    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

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

    //customer section
 
}   

export class updateCustomerDto{
    //user section
    fisrtname: string

    lastname: string

    @IsEmail()
    email: string

    password: string

    @IsNumberString()
    phone: string

    @IsDateString()
    dateOfBirth: Date

    city: string

    address: string
    
    @IsEnum(GenderEnum)
    gender: GenderEnum

    //customer section
    
    lastActivity: Date

    // @IsNumber()
    // @IsEmpty()
    serviceUsageTime: number
 
    salon: SalonEntity[]

    @IsEnum(RoleEnum)
    roles: RoleEnum[]

}   

export class updateFavoriteSalonDto {
    
    @IsNotEmpty()
    operation: string


}