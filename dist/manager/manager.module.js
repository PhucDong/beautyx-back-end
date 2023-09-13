"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const manager_controller_1 = require("./manager.controller");
const manager_service_1 = require("./manager.service");
const ManagerEntity_1 = require("../TypeOrms/ManagerEntity");
const typeorm_1 = require("@nestjs/typeorm");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const salon_module_1 = require("../salon/salon.module");
const AppointmentEntity_1 = require("../TypeOrms/AppointmentEntity");
let ManagerModule = exports.ManagerModule = class ManagerModule {
};
exports.ManagerModule = ManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ManagerEntity_1.ManagerEntity, SalonEntity_1.SalonEntity, AppointmentEntity_1.AppointmentEntity]),
            salon_module_1.SalonModule
        ],
        controllers: [manager_controller_1.ManagerController],
        providers: [manager_service_1.ManagerService],
        exports: [manager_service_1.ManagerService]
    })
], ManagerModule);
//# sourceMappingURL=manager.module.js.map