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
exports.CustomerEntity = void 0;
const typeorm_1 = require("typeorm");
const ReviewEntity_1 = require("./ReviewEntity");
const AppointmentEntity_1 = require("./AppointmentEntity");
const Profile_1 = require("./Profile");
const SalonEntity_1 = require("./SalonEntity");
let CustomerEntity = exports.CustomerEntity = class CustomerEntity extends Profile_1.Profile {
};
__decorate([
    (0, typeorm_1.Column)({
        default: () => '(CURRENT_DATE)'
    }),
    __metadata("design:type", Date)
], CustomerEntity.prototype, "lastActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], CustomerEntity.prototype, "serviceUsageTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], CustomerEntity.prototype, "customerPhoto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReviewEntity_1.ReviewEntity, (review) => review.customer),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AppointmentEntity_1.AppointmentEntity, (appointment) => appointment.customer),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => SalonEntity_1.SalonEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], CustomerEntity.prototype, "salons", void 0);
exports.CustomerEntity = CustomerEntity = __decorate([
    (0, typeorm_1.Entity)()
], CustomerEntity);
//# sourceMappingURL=CustomerEntity.js.map