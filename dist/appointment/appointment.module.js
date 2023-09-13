"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const appointment_controller_1 = require("./appointment.controller");
const appointment_service_1 = require("./appointment.service");
const typeorm_1 = require("@nestjs/typeorm");
const EmployeeEntity_1 = require("../TypeOrms/EmployeeEntity");
const CustomerEntity_1 = require("../TypeOrms/CustomerEntity");
const ServiceEntity_1 = require("../TypeOrms/ServiceEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const AppointmentEntity_1 = require("../TypeOrms/AppointmentEntity");
let AppointmentModule = exports.AppointmentModule = class AppointmentModule {
};
exports.AppointmentModule = AppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([AppointmentEntity_1.AppointmentEntity, EmployeeEntity_1.EmployeeEntity, CustomerEntity_1.CustomerEntity, SalonEntity_1.SalonEntity, ServiceEntity_1.ServiceEntity])],
        controllers: [appointment_controller_1.AppointmentController],
        providers: [appointment_service_1.AppointmentService]
    })
], AppointmentModule);
//# sourceMappingURL=appointment.module.js.map