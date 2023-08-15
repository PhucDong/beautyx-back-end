import { IsEmail, IsEnum, IsNotEmpty, Matches, isEmail } from "class-validator";
import { GenderEnum } from "src/TypeOrms/Profile";

export class loginDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}

export class registerDto{
    //user section
    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsEmail()
    email: string

    // /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    // ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
    password: string

    //customer section
 
} 