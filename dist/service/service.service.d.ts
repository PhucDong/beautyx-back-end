import { createServiceDto, updateServiceDto } from 'src/DTOs/ServiceDto';
import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { Repository } from 'typeorm';
export declare class ServiceService {
    private serviceRepository;
    private categoryRepository;
    constructor(serviceRepository: Repository<ServiceEntity>, categoryRepository: Repository<ServiceCategoryEntity>);
    getServices(): Promise<ServiceEntity[]>;
    getService(idToFind: number): Promise<ServiceEntity>;
    createService(categoryId: number, newService: createServiceDto): Promise<ServiceEntity>;
    updateService(idToUpdate: number, updateDetails: updateServiceDto): Promise<import("typeorm").UpdateResult>;
    deleteService(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
