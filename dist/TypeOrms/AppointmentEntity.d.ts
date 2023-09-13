import { CustomerEntity } from "./CustomerEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { SalonEntity } from "./SalonEntity";
import { ServiceEntity } from "./ServiceEntity";
import { ReviewEntity } from "./ReviewEntity";
import { ApprovalStatusEnum } from "src/constants";
export declare class AppointmentEntity {
    id: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    estimatedEndTime: Date;
    approvalStatus: ApprovalStatusEnum;
    salon: SalonEntity;
    customer: CustomerEntity;
    employee: EmployeeEntity;
    services: ServiceEntity[];
    review: ReviewEntity;
}
