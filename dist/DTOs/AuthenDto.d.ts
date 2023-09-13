import { RoleEnum } from "src/constants";
export declare class loginDto {
    email: string;
    password: string;
}
export declare class registerDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: RoleEnum;
}
