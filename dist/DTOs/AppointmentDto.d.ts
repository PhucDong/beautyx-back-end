import { ServiceEntity } from "src/TypeOrms/ServiceEntity";
import { ApprovalStatusEnum } from "src/constants";
export declare class createAppointmentDto {
    appointmentDate: Date;
    startTime: Date;
    estimatedEndTime: Date;
    services: number[];
}
export declare class updateAppointmentDto {
    appointmentDate: Date;
    startTime: Date;
    estimatedEndTime: Date;
    approvalStatus: ApprovalStatusEnum;
}
export declare class updateAppointmentServicesDto {
    services: ServiceEntity[];
}
export declare class updateAppointmentStatusDto {
    approvalStatus: ApprovalStatusEnum;
}
