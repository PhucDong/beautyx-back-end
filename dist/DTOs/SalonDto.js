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
exports.searchSalonDto = exports.updateSalonWorkDayListDto = exports.updateSalonWorkDayDto = exports.updateSalonTypesDto = exports.updateSalonHighLightsDto = exports.updateSalonDto = exports.createSalonDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class createSalonDto {
}
exports.createSalonDto = createSalonDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createSalonDto.prototype, "salonName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createSalonDto.prototype, "salonAddress", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => updateSalonWorkDayDto),
    __metadata("design:type", Array)
], createSalonDto.prototype, "workDays", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createSalonDto.prototype, "highLights", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createSalonDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createSalonDto.prototype, "salonTypes", void 0);
class updateSalonDto {
}
exports.updateSalonDto = updateSalonDto;
class updateSalonHighLightsDto {
}
exports.updateSalonHighLightsDto = updateSalonHighLightsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], updateSalonHighLightsDto.prototype, "highLights", void 0);
class updateSalonTypesDto {
}
exports.updateSalonTypesDto = updateSalonTypesDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], updateSalonTypesDto.prototype, "salonTypes", void 0);
class updateSalonWorkDayDto {
}
exports.updateSalonWorkDayDto = updateSalonWorkDayDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], updateSalonWorkDayDto.prototype, "workDay", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateSalonWorkDayDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/),
    __metadata("design:type", Date)
], updateSalonWorkDayDto.prototype, "endTime", void 0);
class updateSalonWorkDayListDto {
}
exports.updateSalonWorkDayListDto = updateSalonWorkDayListDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => updateSalonWorkDayDto),
    __metadata("design:type", Array)
], updateSalonWorkDayListDto.prototype, "workDayList", void 0);
class searchSalonDto {
}
exports.searchSalonDto = searchSalonDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], searchSalonDto.prototype, "searchStr", void 0);
//# sourceMappingURL=SalonDto.js.map