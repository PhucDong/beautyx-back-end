"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const ServiceCategoryEntity_1 = require("../TypeOrms/ServiceCategoryEntity");
const typeorm_2 = require("typeorm");
let ServiceCategoryService = exports.ServiceCategoryService = class ServiceCategoryService {
    constructor(serviceCategoryRepository, salonRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.salonRepository = salonRepository;
    }
    getServiceCategories() {
        return this.serviceCategoryRepository.find({ relations: ['services'] });
    }
    async getServiceCategory(idToFind) {
        const serviceCategory = await this.serviceCategoryRepository.findOneBy({ id: idToFind });
        if (!serviceCategory)
            throw new common_1.HttpException('the service category with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return serviceCategory;
    }
    getServiceCategoryServices(idToFind) {
        return this.serviceCategoryRepository.findOne({ relations: ['services'], where: { id: idToFind } });
    }
    async createServiceCategory(salonId, newCategory) {
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { serviceCategories: true },
        });
        if (!salonToUpdate)
            throw new common_1.HttpException('salon cannot be found to add new category', common_1.HttpStatus.NOT_FOUND);
        const categoryToSave = this.serviceCategoryRepository.create(Object.assign({}, newCategory));
        const savedCategory = await this.serviceCategoryRepository.save(categoryToSave);
        salonToUpdate.serviceCategories.push(savedCategory);
        const updatedSalon = await this.salonRepository.save(salonToUpdate);
        return savedCategory;
    }
    updateServiceCategory(idToUpdate, updateDetails) {
        return this.serviceCategoryRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    deleteServiceCategory(idToDelete) {
        return this.serviceCategoryRepository.delete(idToDelete);
    }
};
exports.ServiceCategoryService = ServiceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ServiceCategoryEntity_1.ServiceCategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceCategoryService);
//# sourceMappingURL=service-category.service.js.map