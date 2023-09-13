import { ServiceCategoryEntity } from "./ServiceCategoryEntity";
export declare class ServiceEntity {
    id: number;
    serviceName: string;
    duration: Date;
    price: number;
    description: string;
    serviceCategory: ServiceCategoryEntity;
}
