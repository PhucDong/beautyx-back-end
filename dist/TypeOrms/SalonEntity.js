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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalonEntity = void 0;
const typeorm_1 = require("typeorm");
const AppointmentEntity_1 = require("./AppointmentEntity");
const EmployeeEntity_1 = require("./EmployeeEntity");
const InventoryEntity_1 = require("./InventoryEntity");
const ManagerEntity_1 = require("./ManagerEntity");
const ServiceCategoryEntity_1 = require("./ServiceCategoryEntity");
let SalonEntity = exports.SalonEntity = class SalonEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], SalonEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "salonName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "salonAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "workDays", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "highLights", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalonEntity.prototype, "salonTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], SalonEntity.prototype, "salonPhotos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceCategoryEntity_1.ServiceCategoryEntity, (serivceCategories) => serivceCategories.salon),
    __metadata("design:type", Array)
], SalonEntity.prototype, "serviceCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AppointmentEntity_1.AppointmentEntity, (appointment) => appointment.salon),
    __metadata("design:type", Array)
], SalonEntity.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InventoryEntity_1.InventoryEntity, (inventory) => inventory.salon),
    __metadata("design:type", Array)
], SalonEntity.prototype, "inventories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeEntity_1.EmployeeEntity, (employee) => employee.salon),
    __metadata("design:type", Array)
], SalonEntity.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ManagerEntity_1.ManagerEntity, (manager) => manager.salon, {}),
    __metadata("design:type", ManagerEntity_1.ManagerEntity)
], SalonEntity.prototype, "manager", void 0);
exports.SalonEntity = SalonEntity = __decorate([
    (0, typeorm_1.Entity)()
], SalonEntity);
//# sourceMappingURL=SalonEntity.js.map