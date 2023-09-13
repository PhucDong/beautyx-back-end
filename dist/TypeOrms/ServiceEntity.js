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
exports.ServiceEntity = void 0;
const typeorm_1 = require("typeorm");
const ServiceCategoryEntity_1 = require("./ServiceCategoryEntity");
let ServiceEntity = exports.ServiceEntity = class ServiceEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], ServiceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceEntity.prototype, "serviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time'
    }),
    __metadata("design:type", Date)
], ServiceEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServiceEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ServiceCategoryEntity_1.ServiceCategoryEntity, (serviceCategory) => serviceCategory.services),
    __metadata("design:type", ServiceCategoryEntity_1.ServiceCategoryEntity)
], ServiceEntity.prototype, "serviceCategory", void 0);
exports.ServiceEntity = ServiceEntity = __decorate([
    (0, typeorm_1.Entity)()
], ServiceEntity);
//# sourceMappingURL=ServiceEntity.js.map