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
exports.updateReviewDto = exports.createReviewDto = void 0;
const class_validator_1 = require("class-validator");
class createReviewDto {
}
exports.createReviewDto = createReviewDto;
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createReviewDto.prototype, "rating", void 0);
class updateReviewDto {
}
exports.updateReviewDto = updateReviewDto;
__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], updateReviewDto.prototype, "rating", void 0);
//# sourceMappingURL=ReviewDto.js.map