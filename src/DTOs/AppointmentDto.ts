import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { ServiceEntity } from "src/TypeOrms/ServiceEntity";
import { ApprovalStatusEnum } from "src/constants";

export class createAppointmentDto {

    @IsDateString()
    appointmentDate: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    estimatedEndTime: Date

    @IsArray()
    services: number[]

    
}
export class updateAppointmentDto{

    @IsDateString()
    appointmentDate: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    estimatedEndTime: Date

    @IsEnum(ApprovalStatusEnum)
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