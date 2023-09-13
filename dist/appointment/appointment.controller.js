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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const AppointmentDto_1 = require("../DTOs/AppointmentDto");
let AppointmentController = exports.AppointmentController = class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async getAppointments() {
        const appointments = await this.appointmentService.getAppointments();
        return appointments;
    }
    getAppointment(idToFind) {
        return this.appointmentService.getAppointment(idToFind);
    }
    getAppointmentDetails(idToFind) {
        return this.appointmentService.getAppointmentDetails(idToFind);
    }
    createAppointment(params, services) {
        return this.appointmentService.createAppointment(params.salonId, params.employeeId, params.customerId, services);
    }
    async updateAppointment(idToUpdate, updateDetails) {
        const updatedAppointment = await this.appointmentService.updateAppointment(idToUpdate, updateDetails);
        return updatedAppointment;
    }
    async updateAppointmentServices(idToUpdate, updateDetails) {
        const updatedAppointmentSerivce = await this.appointmentService.updateAppointmentServices(idToUpdate, updateDetails);
        return updatedAppointmentSerivce;
    }
    async updateAppointmentStatus(idToUpdate, updateDetails) {
        const updatedStatus = await this.appointmentService.updateAppointmentStatus(idToUpdate, updateDetails);
        return updatedStatus;
    }
    deleteAppointment(idToDelete) {
        return this.appointmentService.deleteAppointment(idToDelete);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointment", null);
__decorate([
    (0, common_1.Get)('id/:id/details'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointmentDetails", null);
__decorate([
    (0, common_1.Post)('create/salon/id/:salonId/employee/id/:employeeId/customer/id/:customerId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AppointmentDto_1.createAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AppointmentDto_1.updateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Put)('update/services/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AppointmentDto_1.updateAppointmentServicesDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "updateAppointmentServices", null);
__decorate([
    (0, common_1.Put)('update/status/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AppointmentDto_1.updateAppointmentStatusDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "updateAppointmentStatus", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "deleteAppointment", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('appointment'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map