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
exports.InventoryEntity = void 0;
const typeorm_1 = require("typeorm");
const SalonEntity_1 = require("./SalonEntity");
let InventoryEntity = exports.InventoryEntity = class InventoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], InventoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryEntity.prototype, "inventoryName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryEntity.prototype, "inventoryQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryEntity.prototype, "inventoryVolume", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SalonEntity_1.SalonEntity, (salon) => salon.inventories),
    __metadata("design:type", SalonEntity_1.SalonEntity)
], InventoryEntity.prototype, "salon", void 0);
exports.InventoryEntity = InventoryEntity = __decorate([
    (0, typeorm_1.Entity)()
], InventoryEntity);
//# sourceMappingURL=InventoryEntity.js.map