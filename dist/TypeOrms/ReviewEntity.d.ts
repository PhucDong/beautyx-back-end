import { CustomerEntity } from "./CustomerEntity";
import { AppointmentEntity } from "./AppointmentEntity";
export declare class ReviewEntity {
    id: number;
    rating: number;
    comment: string;
    customer: CustomerEntity;
    appointment: AppointmentEntity;
}
