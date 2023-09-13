import { ServiceService } from './service.service';
import { createServiceDto, updateServiceDto } from 'src/DTOs/ServiceDto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    getServices(): Promise<import("../TypeOrms/ServiceEntity").ServiceEntity[]>;
    getService(idToFind: number): Promise<import("../TypeOrms/ServiceEntity").ServiceEntity>;
    createService(categoryId: number, newService: createServiceDto): Promise<import("../TypeOrms/ServiceEntity").ServiceEntity>;
    updateService(idToUpdate: number, updateDetails: updateServiceDto): Promise<import("typeorm").UpdateResult>;
    deleteService(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
