import { SalonEntity } from "./SalonEntity";
import { Profile } from "./Profile";
export declare class ManagerEntity extends Profile {
    password: string;
    refreshToken: string;
    salon: SalonEntity;
}
