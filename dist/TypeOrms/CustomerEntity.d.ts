import { ReviewEntity } from "./ReviewEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { Profile } from "./Profile";
import { SalonEntity } from "./SalonEntity";
export declare class CustomerEntity extends Profile {
    lastActivity: Date;
    serviceUsageTime: number;
    password: string;
    refreshToken: string;
    customerPhoto: string;
    reviews: ReviewEntity[];
    appointments: AppointmentEntity[];
    salons: SalonEntity[];
}
