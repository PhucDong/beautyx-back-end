import { IsEmail, IsEnum, IsNotEmpty, isEmail } from "class-validator";
import { GenderEnum } from "src/TypeOrms/Profile";

export class loginDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}

export class registerCustomerDto{
    //user section
    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    //customer section
 
} 