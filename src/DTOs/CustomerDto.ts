import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { GenderEnum } from "src/TypeOrms/Profile"
import { SalonEntity } from "src/TypeOrms/SalonEntity"

export class createCustomerDto{
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

    //customer section


 
 
}   
export class updateCustomerDto{
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

    //customer section

    lastActivity: Date

    @IsNumber()
    serviceUsageTime: number
 
    salon: SalonEntity[]

}   

export class updateFavoriteSalonDto {
    
    @IsNotEmpty()
    operation: string


}