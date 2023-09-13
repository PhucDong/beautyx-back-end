import { AppointmentEntity } from "./AppointmentEntity";
import { Profile } from "./Profile";
import { SalonEntity } from "./SalonEntity";
export declare class EmployeeEntity extends Profile {
    job: string;
    workDays: string;
    salary: number;
    experience: string;
    pastAppointment: number;
    rating: number;
    appointments: AppointmentEntity[];
    salon: SalonEntity;
}
