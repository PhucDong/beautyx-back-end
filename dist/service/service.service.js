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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ServiceCategoryEntity_1 = require("../TypeOrms/ServiceCategoryEntity");
const ServiceEntity_1 = require("../TypeOrms/ServiceEntity");
const typeorm_2 = require("typeorm");
let ServiceService = exports.ServiceService = class ServiceService {
    constructor(serviceRepository, categoryRepository) {
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
    }
    getServices() {
        return this.serviceRepository.find({ relations: [] });
    }
    async getService(idToFind) {
        const service = await this.serviceRepository.findOneBy({ id: idToFind });
        if (!service)
            throw new common_1.HttpException('service with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return service;
    }
    async createService(categoryId, newService) {
        const categoryToUpdate = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: { services: true },
        });
        if (!categoryToUpdate)
            throw new common_1.HttpException('service category cannot be found to add new service', common_1.HttpStatus.NOT_FOUND);
        const serviceToSave = this.serviceRepository.create(Object.assign({}, newService));
        const savedService = await this.serviceRepository.save(serviceToSave);
        categoryToUpdate.services.push(savedService);
        const updatedCategory = await this.categoryRepository.save(categoryToUpdate);
        return savedService;
    }
    updateService(idToUpdate, updateDetails) {
        return this.serviceRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    deleteService(idToDelete) {
        return this.serviceRepository.delete(idToDelete);
    }
};
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ServiceEntity_1.ServiceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ServiceCategoryEntity_1.ServiceCategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map