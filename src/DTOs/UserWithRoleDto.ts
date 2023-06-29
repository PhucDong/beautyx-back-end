import { IsNotEmpty, IsNumber } from "class-validator";

export class createUserWithRoleDto {
    
    @IsNotEmpty()
    @IsNumber()
    userId: number

}

export class updateUserWithRoleDto {
    
    @IsNotEmpty()
    @IsNumber()
    userId: number
    
}