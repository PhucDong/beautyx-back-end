import { AppointmentEntity } from "./AppointmentEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { InventoryEntity } from "./InventoryEntity";
import { ManagerEntity } from "./ManagerEntity";
import { ServiceCategoryEntity } from "./ServiceCategoryEntity";
export declare class SalonEntity {
    id: number;
    salonName: string;
    salonAddress: string;
    workDays: string;
    highLights: string;
    description: string;
    salonTypes: string;
    salonPhotos: string;
    serviceCategories: ServiceCategoryEntity[];
    appointments: AppointmentEntity[];
    inventories: InventoryEntity[];
    employees: EmployeeEntity[];
    manager: ManagerEntity;
}
