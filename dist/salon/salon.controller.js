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
exports.SalonController = void 0;
const common_1 = require("@nestjs/common");
const salon_service_1 = require("./salon.service");
const SalonDto_1 = require("../DTOs/SalonDto");
const platform_express_1 = require("@nestjs/platform-express");
const FileUpload_1 = require("../FileUpload");
let SalonController = exports.SalonController = class SalonController {
    constructor(salonService) {
        this.salonService = salonService;
    }
    async getSalons(pageNumber, pageSize, sortOption) {
        const salons = await this.salonService.getSalons(pageSize, pageNumber, sortOption);
        return salons;
    }
    getSalon(idToFind) {
        return this.salonService.getSalon(idToFind);
    }
    async getSalonsPage(params) {
        const salons = await this.salonService.getSalonsPage(params.pageNumber, params.pageSize, params.keyword);
        return salons;
    }
    async getSalonsFiltered(pageNumber, pageSize, salonType, sortOption) {
        const salons = await this.salonService.getSalonsFiltered(pageSize, pageNumber, salonType, sortOption);
        return salons;
    }
    searchSalonQuery(pageNumber, pageSize, searchKey) {
        return this.salonService.searchSalonQuery(searchKey, pageSize, pageNumber);
    }
    getSalonServiceCategories(idToFind) {
        return this.salonService.getSalonServiceCategories(idToFind);
    }
    getSalonAppointments(idToFind) {
        return this.salonService.getSalonAppointments(idToFind);
    }
    getSalonInventories(idToFind) {
        return this.salonService.getSalonInventories(idToFind);
    }
    getSalonEmployess(idToFind) {
        return this.salonService.getSalonEmployess(idToFind);
    }
    createSalon(newSalon) {
        return this.salonService.createSalon(newSalon);
    }
    async updateSalon(idToUpdate, updateDetails) {
        const updatedSalon = await this.salonService.updateSalon(idToUpdate, updateDetails);
        return updatedSalon;
    }
    updateSalonHighLights(idToUpdate, updateDetails) {
        return this.salonService.updateSalonHighLights(idToUpdate, updateDetails);
    }
    updateSalonTypes(idToUpdate, updateDetails) {
        console.log('update a list of salon types');
        console.log(updateDetails);
        return this.salonService.updateSalonTypes(idToUpdate, updateDetails);
    }
    updateSalonWorkDay(idToUpdate, updateDetails) {
        return this.salonService.updateSalonWorkDay(idToUpdate, updateDetails);
    }
    updateSalonWorkDayList(idToUpdate, updateDetails) {
        console.log('update a list of workdays');
        console.log(updateDetails);
        return this.salonService.updateSalonWorkDayList(idToUpdate, updateDetails);
    }
    deleteSalon(idToDelete) {
        return this.salonService.deleteSalon(idToDelete);
    }
    uploadWallpaper(file, idToUpdate) {
        if (!file) {
            throw new common_1.BadRequestException('File is not an image');
        }
        else {
            return this.salonService.updateSalonPhoto(idToUpdate, file);
        }
    }
    async getPicture(fileName, res) {
        res.sendFile(fileName, { root: './pics' });
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)("pageNumber", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)("pageSize", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)("sortOption")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], SalonController.prototype, "getSalons", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "getSalon", null);
__decorate([
    (0, common_1.Get)('keyword/:keyword/size/:pageSize/page/:pageNumber'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalonController.prototype, "getSalonsPage", null);
__decorate([
    (0, common_1.Get)('/filtered/'),
    __param(0, (0, common_1.Query)("pageNumber", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)("pageSize", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)("salonType")),
    __param(3, (0, common_1.Query)("sortOption")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SalonController.prototype, "getSalonsFiltered", null);
__decorate([
    (0, common_1.Get)('search/query'),
    __param(0, (0, common_1.Query)("pageNumber", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)("pageSize", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('searchKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "searchSalonQuery", null);
__decorate([
    (0, common_1.Get)('id/:id/service-categories'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "getSalonServiceCategories", null);
__decorate([
    (0, common_1.Get)('id/:id/appointments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "getSalonAppointments", null);
__decorate([
    (0, common_1.Get)('id/:id/inventories'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "getSalonInventories", null);
__decorate([
    (0, common_1.Get)('id/:id/employees'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "getSalonEmployess", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SalonDto_1.createSalonDto]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "createSalon", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SalonDto_1.updateSalonDto]),
    __metadata("design:returntype", Promise)
], SalonController.prototype, "updateSalon", null);
__decorate([
    (0, common_1.Put)('update/highlights/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SalonDto_1.updateSalonHighLightsDto]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "updateSalonHighLights", null);
__decorate([
    (0, common_1.Put)('update/salontype/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SalonDto_1.updateSalonTypesDto]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "updateSalonTypes", null);
__decorate([
    (0, common_1.Put)('update/workdays/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SalonDto_1.updateSalonWorkDayDto]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "updateSalonWorkDay", null);
__decorate([
    (0, common_1.Put)('update/workdays/list/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SalonDto_1.updateSalonWorkDayListDto]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "updateSalonWorkDayList", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "deleteSalon", null);
__decorate([
    (0, common_1.Post)('/id/:salonId/upload/:imageType'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FileUpload_1.salonMulterOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('salonId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], SalonController.prototype, "uploadWallpaper", null);
__decorate([
    (0, common_1.Get)('pictures/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SalonController.prototype, "getPicture", null);
exports.SalonController = SalonController = __decorate([
    (0, common_1.Controller)('salon'),
    __metadata("design:paramtypes", [salon_service_1.SalonService])
], SalonController);
//# sourceMappingURL=salon.controller.js.map