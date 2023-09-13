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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const InventoryEntity_1 = require("../TypeOrms/InventoryEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const typeorm_2 = require("typeorm");
let InventoryService = exports.InventoryService = class InventoryService {
    constructor(inventoryRepository, salonRepository) {
        this.inventoryRepository = inventoryRepository;
        this.salonRepository = salonRepository;
    }
    getinventories() {
        return this.inventoryRepository.find();
    }
    async getInventory(idToFind) {
        const inventory = await this.inventoryRepository.findOneBy({ id: idToFind });
        if (!inventory)
            throw new common_1.HttpException('the inventory with the given id  cannot be found', common_1.HttpStatus.NOT_FOUND);
        return inventory;
    }
    async createInventory(salonId, newInventory) {
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { inventories: true },
        });
        if (!salonToUpdate)
            throw new common_1.HttpException('salon cannot be found to add new inventory item', common_1.HttpStatus.NOT_FOUND);
        const inventoryToSave = this.inventoryRepository.create(Object.assign({}, newInventory));
        const savedInventory = await this.inventoryRepository.save(inventoryToSave);
        salonToUpdate.inventories.push(savedInventory);
        const updatedSalon = await this.salonRepository.save(salonToUpdate);
        return savedInventory;
    }
    updateInventory(idToUpdate, updateDetails) {
        return this.inventoryRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    deleteInventory(idToDelete) {
        return this.inventoryRepository.delete(idToDelete);
    }
};
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(InventoryEntity_1.InventoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map