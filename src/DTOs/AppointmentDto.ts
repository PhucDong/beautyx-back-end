import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class createAppointmentDto {
    @IsNotEmpty()
    @IsArray()
    services: number[]
}
export class updateAppointmentDto{

    @IsNotEmpty()
    @IsBoolean()
    approvalStatus: boolean
    
}