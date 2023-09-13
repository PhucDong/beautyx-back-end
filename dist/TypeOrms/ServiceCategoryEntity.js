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
exports.ServiceCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const ServiceEntity_1 = require("./ServiceEntity");
const SalonEntity_1 = require("./SalonEntity");
let ServiceCategoryEntity = exports.ServiceCategoryEntity = class ServiceCategoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], ServiceCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceCategoryEntity.prototype, "serviceCategoryName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceEntity_1.ServiceEntity, (serivce) => serivce.serviceCategory, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], ServiceCategoryEntity.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SalonEntity_1.SalonEntity, (salon) => salon.serviceCategories, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", SalonEntity_1.SalonEntity)
], ServiceCategoryEntity.prototype, "salon", void 0);
exports.ServiceCategoryEntity = ServiceCategoryEntity = __decorate([
    (0, typeorm_1.Entity)()
], ServiceCategoryEntity);
//# sourceMappingURL=ServiceCategoryEntity.js.map