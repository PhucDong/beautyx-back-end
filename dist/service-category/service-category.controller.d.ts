import { createServiceCategoryDto, updateServiceCategoryDto } from 'src/DTOs/ServiceCategoryDto';
import { ServiceCategoryService } from './service-category.service';
export declare class ServiceCategoryController {
    private readonly serviceCategoryService;
    constructor(serviceCategoryService: ServiceCategoryService);
    getServiceCategories(): Promise<import("../TypeOrms/ServiceCategoryEntity").ServiceCategoryEntity[]>;
    getServiceCategory(idToFind: number): Promise<import("../TypeOrms/ServiceCategoryEntity").ServiceCategoryEntity>;
    getServiceCategoryServices(idToFind: number): Promise<import("../TypeOrms/ServiceCategoryEntity").ServiceCategoryEntity>;
    createServiceCategory(salonId: number, newCategory: createServiceCategoryDto): Promise<import("../TypeOrms/ServiceCategoryEntity").ServiceCategoryEntity>;
    updateServiceCategory(idToUpdate: number, updateDetails: updateServiceCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteServiceCategory(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
