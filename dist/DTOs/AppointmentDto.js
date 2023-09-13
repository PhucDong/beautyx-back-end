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
exports.updateAppointmentStatusDto = exports.updateAppointmentServicesDto = exports.updateAppointmentDto = exports.createAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
class createAppointmentDto {
}
exports.createAppointmentDto = createAppointmentDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], createAppointmentDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], createAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], createAppointmentDto.prototype, "estimatedEndTime", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], createAppointmentDto.prototype, "services", void 0);
class updateAppointmentDto {
}
exports.updateAppointmentDto = updateAppointmentDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], updateAppointmentDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateAppointmentDto.prototype, "estimatedEndTime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(constants_1.ApprovalStatusEnum),
    __metadata("design:type", String)
], updateAppointmentDto.prototype, "approvalStatus", void 0);
class updateAppointmentServicesDto {
}
exports.updateAppointmentServicesDto = updateAppointmentServicesDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], updateAppointmentServicesDto.prototype, "services", void 0);
class updateAppointmentStatusDto {
}
exports.updateAppointmentStatusDto = updateAppointmentStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], updateAppointmentStatusDto.prototype, "approvalStatus", void 0);
//# sourceMappingURL=AppointmentDto.js.map