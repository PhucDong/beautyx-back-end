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
exports.updateFavoriteSalonDto = exports.updateCustomerDto = exports.createCustomerDto = void 0;
const class_validator_1 = require("class-validator");
const Profile_1 = require("../TypeOrms/Profile");
class createCustomerDto {
}
exports.createCustomerDto = createCustomerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], createCustomerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Profile_1.GenderEnum),
    __metadata("design:type", String)
], createCustomerDto.prototype, "gender", void 0);
class updateCustomerDto {
}
exports.updateCustomerDto = updateCustomerDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], updateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], updateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], updateCustomerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Profile_1.GenderEnum),
    __metadata("design:type", String)
], updateCustomerDto.prototype, "gender", void 0);
class updateFavoriteSalonDto {
}
exports.updateFavoriteSalonDto = updateFavoriteSalonDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], updateFavoriteSalonDto.prototype, "operation", void 0);
//# sourceMappingURL=CustomerDto.js.map