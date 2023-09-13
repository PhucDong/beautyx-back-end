import { RoleEnum } from "src/constants";
export declare enum GenderEnum {
    MALE = "male",
    FEMALE = "female",
    OTHERS = "others"
}
export declare abstract class Profile {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    city: string;
    address: string;
    gender: GenderEnum;
    role: RoleEnum;
}
