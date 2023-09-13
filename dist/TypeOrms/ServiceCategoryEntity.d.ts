import { ServiceEntity } from "./ServiceEntity";
import { SalonEntity } from "./SalonEntity";
export declare class ServiceCategoryEntity {
    id: number;
    serviceCategoryName: string;
    services: ServiceEntity[];
    salon: SalonEntity;
}
