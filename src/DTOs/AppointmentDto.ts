import { IsArray, IsBoolean, IsDateString, IsNotEmpty } from "class-validator";
import { ApprovalStatusEnum } from "src/TypeOrms/AppointmentEntity";
import { ServiceEntity } from "src/TypeOrms/ServiceEntity";

export class createAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    appointmentDate: Date

    @IsNotEmpty()
    startTime: Date

    @IsNotEmpty()
    estimatedEndTime: Date

    @IsNotEmpty()
    @IsArray()
    services: number[]
}
export class updateAppointmentDto{

    @IsDateString()
    appointmentDate: Date

    startTime: Date

    estimatedEndTime: Date

    @IsBoolean()
    approvalStatus: ApprovalStatusEnum

    
}
export class updateAppointmentServicesDto{
    
    @IsNotEmpty()
    services: ServiceEntity[]

}
export class updateAppointmentStatusDto{
    
    @IsNotEmpty()
    approvalStatus: ApprovalStatusEnum
}