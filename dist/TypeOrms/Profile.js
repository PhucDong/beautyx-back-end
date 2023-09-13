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
exports.Profile = exports.GenderEnum = void 0;
const constants_1 = require("../constants");
const typeorm_1 = require("typeorm");
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
    GenderEnum["OTHERS"] = "others";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
class Profile {
}
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        unique: true
    }),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Birth',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Profile.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Address',
        nullable: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'enum',
        enum: GenderEnum,
    }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'enum',
        enum: constants_1.RoleEnum,
    }),
    __metadata("design:type", String)
], Profile.prototype, "role", void 0);
//# sourceMappingURL=Profile.js.map