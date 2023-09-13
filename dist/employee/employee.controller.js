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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const EmployeeDto_1 = require("../DTOs/EmployeeDto");
let EmployeeController = exports.EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async getEmployees() {
        const employees = await this.employeeService.getEmployees();
        return employees;
    }
    getEmployee(idToFind) {
        return this.employeeService.getEmployee(idToFind);
    }
    getEmployeeAppointments(idToFind) {
        return this.employeeService.getEmployeeAppointments(idToFind);
    }
    getEmployeesAvailable(params) {
        return this.employeeService.getEmployeesAvailable(params);
    }
    createEmployee(salonId, newEmployee) {
        return this.employeeService.createEmployee(salonId, newEmployee);
    }
    async updateEmployee(idToUpdate, updateDetails) {
        const updatedEmployee = await this.employeeService.updateEmployee(idToUpdate, updateDetails);
        return updatedEmployee;
    }
    updateEmployeeWorkDay(idToUpdate, updateDetails) {
        return this.employeeService.updateEmployeeWorkDay(idToUpdate, updateDetails);
    }
    updateEmployeeWorkDayList(idToUpdate, updateDetails) {
        return this.employeeService.updateEmployeeWorkDayList(idToUpdate, updateDetails);
    }
    deleteEmployee(idToDelete) {
        return this.employeeService.deleteEmployee(idToDelete);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployees", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Get)('id/:id/appointments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "getEmployeeAppointments", null);
__decorate([
    (0, common_1.Get)('available/salon/id/:salonId/date/:appointmentDate/start/:startTime/end/:estimatedEndTime'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmployeeDto_1.getEmployeesAvailableDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "getEmployeesAvailable", null);
__decorate([
    (0, common_1.Post)('create/salon/id/:salonId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('salonId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EmployeeDto_1.createEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EmployeeDto_1.updateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Put)('update/workdays/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EmployeeDto_1.updateEmployeeWorkDayDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "updateEmployeeWorkDay", null);
__decorate([
    (0, common_1.Put)('update/workdays/list/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EmployeeDto_1.updateEmployeeWorkDayListDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "updateEmployeeWorkDayList", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "deleteEmployee", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map