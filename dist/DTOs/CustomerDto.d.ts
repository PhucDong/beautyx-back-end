import { GenderEnum } from "src/TypeOrms/Profile";
import { SalonEntity } from "src/TypeOrms/SalonEntity";
export declare class createCustomerDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
    city: string;
    address: string;
    gender: GenderEnum;
}
export declare class updateCustomerDto {
    fisrtname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
    city: string;
    address: string;
    gender: GenderEnum;
    lastActivity: Date;
    serviceUsageTime: number;
    salon: SalonEntity[];
}
export declare class updateFavoriteSalonDto {
    operation: string;
}
