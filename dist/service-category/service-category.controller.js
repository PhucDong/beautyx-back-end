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
exports.ServiceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const ServiceCategoryDto_1 = require("../DTOs/ServiceCategoryDto");
const service_category_service_1 = require("./service-category.service");
let ServiceCategoryController = exports.ServiceCategoryController = class ServiceCategoryController {
    constructor(serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }
    async getServiceCategories() {
        const categories = await this.serviceCategoryService.getServiceCategories();
        return categories;
    }
    getServiceCategory(idToFind) {
        return this.serviceCategoryService.getServiceCategory(idToFind);
    }
    getServiceCategoryServices(idToFind) {
        return this.serviceCategoryService.getServiceCategoryServices(idToFind);
    }
    createServiceCategory(salonId, newCategory) {
        return this.serviceCategoryService.createServiceCategory(salonId, newCategory);
    }
    async updateServiceCategory(idToUpdate, updateDetails) {
        const updatedCategory = await this.serviceCategoryService.updateServiceCategory(idToUpdate, updateDetails);
        return updatedCategory;
    }
    deleteServiceCategory(idToDelete) {
        return this.serviceCategoryService.deleteServiceCategory(idToDelete);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "getServiceCategories", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "getServiceCategory", null);
__decorate([
    (0, common_1.Get)('id/:id/services'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "getServiceCategoryServices", null);
__decorate([
    (0, common_1.Post)('create/salon/id/:salonId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('salonId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ServiceCategoryDto_1.createServiceCategoryDto]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "createServiceCategory", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ServiceCategoryDto_1.updateServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "updateServiceCategory", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceCategoryController.prototype, "deleteServiceCategory", null);
exports.ServiceCategoryController = ServiceCategoryController = __decorate([
    (0, common_1.Controller)('service-category'),
    __metadata("design:paramtypes", [service_category_service_1.ServiceCategoryService])
], ServiceCategoryController);
//# sourceMappingURL=service-category.controller.js.map