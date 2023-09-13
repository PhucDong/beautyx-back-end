import { createServiceCategoryDto, updateServiceCategoryDto } from 'src/DTOs/ServiceCategoryDto';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { Repository } from 'typeorm';
export declare class ServiceCategoryService {
    private serviceCategoryRepository;
    private salonRepository;
    constructor(serviceCategoryRepository: Repository<ServiceCategoryEntity>, salonRepository: Repository<SalonEntity>);
    getServiceCategories(): Promise<ServiceCategoryEntity[]>;
    getServiceCategory(idToFind: number): Promise<ServiceCategoryEntity>;
    getServiceCategoryServices(idToFind: number): Promise<ServiceCategoryEntity>;
    createServiceCategory(salonId: number, newCategory: createServiceCategoryDto): Promise<ServiceCategoryEntity>;
    updateServiceCategory(idToUpdate: number, updateDetails: updateServiceCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteServiceCategory(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
