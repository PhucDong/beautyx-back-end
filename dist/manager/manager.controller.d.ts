import { ManagerService } from './manager.service';
import { createManagerDto } from 'src/DTOs/ManagerDto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    getManagers(): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity[]>;
    getManager(idToFind: number): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity>;
    getManagerDashboard(idToFind: number): Promise<any>;
    createManager(newManager: createManagerDto): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity>;
    updateManager(idToUpdate: number, updateDetails: createManagerDto): Promise<import("typeorm").UpdateResult>;
    assignManagerToSalon(managerId: number, salonId: number): Promise<import("typeorm").UpdateResult>;
    removeManagerFromSalon(managerId: number, salonId: number): Promise<import("typeorm").UpdateResult>;
    deleteManager(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
