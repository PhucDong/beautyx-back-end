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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const CustomerDto_1 = require("../DTOs/CustomerDto");
const FileUpload_1 = require("../FileUpload");
const platform_express_1 = require("@nestjs/platform-express");
const authenAccess_guard_1 = require("../authen/authenAccess.guard");
const authen_guard_1 = require("../authen/authen.guard");
let CustomerController = exports.CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getCutomers() {
        const customers = await this.customerService.getCustomers();
        return customers;
    }
    getCustomer(idToFind, request) {
        return this.customerService.getCustomer(idToFind);
    }
    getCustomerFavorites(idToFind) {
        return this.customerService.getCustomerFavorites(idToFind);
    }
    getCustomerAppointments(idToFind) {
        return this.customerService.getCustomerAppointments(idToFind);
    }
    createCustomer(newCustomer) {
        return this.customerService.createCustomer(newCustomer);
    }
    async updateCustomer(idToUpdate, updateDetails) {
        const updatedCustomer = await this.customerService.updateCustomer(idToUpdate, updateDetails);
        return updatedCustomer;
    }
    async assignSalonToCustomer(params, updateDetails) {
        const updatedCustomer = await this.customerService.assignSalonToCustomer(params.customerId, params.salonId, updateDetails);
        return updatedCustomer;
    }
    deleteCustomer(idToDelete) {
        return this.customerService.deleteCustomer(idToDelete);
    }
    uploadWallpaper(file, idToUpdate) {
        if (!file) {
            throw new common_1.BadRequestException('File is not an image');
        }
        else {
            return this.customerService.updateCustomerPhoto(idToUpdate, file);
        }
    }
    async getPicture(fileName, res) {
        res.sendFile(fileName, { root: './pics' });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCutomers", null);
__decorate([
    (0, common_1.UseGuards)(authenAccess_guard_1.default, authen_guard_1.RolesGuard),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Get)('id/:id/favorites'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomerFavorites", null);
__decorate([
    (0, common_1.Get)('id/:id/appointments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomerAppointments", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CustomerDto_1.createCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Put)('update/id/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CustomerDto_1.updateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Put)('id/:customerId/assign/salon/id/:salonId'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CustomerDto_1.updateFavoriteSalonDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "assignSalonToCustomer", null);
__decorate([
    (0, common_1.Delete)('delete/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Post)('/id/:customerId/upload/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', FileUpload_1.customerMulterOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('customerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "uploadWallpaper", null);
__decorate([
    (0, common_1.Get)('pictures/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getPicture", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map