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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const manager_service_1 = require("./manager.service");
const ManagerDto_1 = require("../DTOs/ManagerDto");
let ManagerController = exports.ManagerController = class ManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    async getManagers() {
        const managers = await this.managerService.getManagers();
        return managers;
    }
    getManager(idToFind) {
        return this.managerService.getManager(idToFind);
    }
    getManagerDashboard(idToFind) {
        return this.managerService.getManagerDashboard(idToFind);
    }
    createManager(newManager) {
        return this.managerService.createManager(newManager);
    }
    async updateManager(idToUpdate, updateDetails) {
        const updatedManager = await this.managerService.updateManager(idToUpdate, updateDetails);
        return updatedManager;
    }
    async assignManagerToSalon(managerId, salonId) {
        const updatedManager = await this.managerService.assignManagerToSalon(managerId, salonId);
        console.log("manager assignment constroller");
        console.log(updatedManager);
        return updatedManager;
    }
    async removeManagerFromSalon(managerId, salonId) {
        const updatedManager = await this.managerService.removeManagerFromSalon(managerId, salonId);
        return updatedManager;
    }
    deleteManager(idToDelete) {
        return this.managerService.deleteManager(idToDelete);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "getManagers", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getManager", null);
__decorate([
    (0, common_1.Get)('id/:id/dashboard'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getManagerDashboard", null);
__decorate([
    (0, common_1.Post)('create/'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ManagerDto_1.createManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "createManager", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ManagerDto_1.createManagerDto]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "updateManager", null);
__decorate([
    (0, common_1.Put)('assign/manager/:managerId/to/salon/:salonId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('managerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('salonId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "assignManagerToSalon", null);
__decorate([
    (0, common_1.Put)('remove/manager/:managerId/from/salon/:salonId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('managerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('salonId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "removeManagerFromSalon", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "deleteManager", null);
exports.ManagerController = ManagerController = __decorate([
    (0, common_1.Controller)('manager'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
//# sourceMappingURL=manager.controller.js.map