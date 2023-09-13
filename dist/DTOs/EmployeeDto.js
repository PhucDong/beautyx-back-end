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
exports.getEmployeesAvailableDto = exports.updateEmployeeWorkDayListDto = exports.updateEmployeeWorkDayDto = exports.updateEmployeeDto = exports.createEmployeeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Profile_1 = require("../TypeOrms/Profile");
class createEmployeeDto {
}
exports.createEmployeeDto = createEmployeeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], createEmployeeDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Profile_1.GenderEnum),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createEmployeeDto.prototype, "job", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => updateEmployeeWorkDayDto),
    __metadata("design:type", Array)
], createEmployeeDto.prototype, "workDays", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createEmployeeDto.prototype, "salary", void 0);
class updateEmployeeDto {
}
exports.updateEmployeeDto = updateEmployeeDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], updateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], updateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], updateEmployeeDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Profile_1.GenderEnum),
    __metadata("design:type", String)
], updateEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], updateEmployeeDto.prototype, "salary", void 0);
class updateEmployeeWorkDayDto {
}
exports.updateEmployeeWorkDayDto = updateEmployeeWorkDayDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], updateEmployeeWorkDayDto.prototype, "workDay", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateEmployeeWorkDayDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateEmployeeWorkDayDto.prototype, "endTime", void 0);
class updateEmployeeWorkDayListDto {
}
exports.updateEmployeeWorkDayListDto = updateEmployeeWorkDayListDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => updateEmployeeWorkDayDto),
    __metadata("design:type", Array)
], updateEmployeeWorkDayListDto.prototype, "workDayList", void 0);
class getEmployeesAvailableDto {
}
exports.getEmployeesAvailableDto = getEmployeesAvailableDto;
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], getEmployeesAvailableDto.prototype, "salonId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], getEmployeesAvailableDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], getEmployeesAvailableDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], getEmployeesAvailableDto.prototype, "estimatedEndTime", void 0);
//# sourceMappingURL=EmployeeDto.js.map