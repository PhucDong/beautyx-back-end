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
exports.AppointmentEntity = void 0;
const typeorm_1 = require("typeorm");
const CustomerEntity_1 = require("./CustomerEntity");
const EmployeeEntity_1 = require("./EmployeeEntity");
const SalonEntity_1 = require("./SalonEntity");
const ServiceEntity_1 = require("./ServiceEntity");
const ReviewEntity_1 = require("./ReviewEntity");
const constants_1 = require("../constants");
let AppointmentEntity = exports.AppointmentEntity = class AppointmentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "appointmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time'
    }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true
    }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time'
    }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "estimatedEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constants_1.ApprovalStatusEnum,
        default: constants_1.ApprovalStatusEnum.PENDING
    }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "approvalStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SalonEntity_1.SalonEntity, (salon) => salon.appointments),
    __metadata("design:type", SalonEntity_1.SalonEntity)
], AppointmentEntity.prototype, "salon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomerEntity_1.CustomerEntity, (customer) => customer.appointments),
    __metadata("design:type", CustomerEntity_1.CustomerEntity)
], AppointmentEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeEntity_1.EmployeeEntity, (employee) => employee.appointments),
    __metadata("design:type", EmployeeEntity_1.EmployeeEntity)
], AppointmentEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ServiceEntity_1.ServiceEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AppointmentEntity.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ReviewEntity_1.ReviewEntity, (review) => review.appointment),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ReviewEntity_1.ReviewEntity)
], AppointmentEntity.prototype, "review", void 0);
exports.AppointmentEntity = AppointmentEntity = __decorate([
    (0, typeorm_1.Entity)()
], AppointmentEntity);
//# sourceMappingURL=AppointmentEntity.js.map