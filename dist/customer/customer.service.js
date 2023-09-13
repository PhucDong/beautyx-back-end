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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const CustomerEntity_1 = require("../TypeOrms/CustomerEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const bcrypt_1 = require("../authen/bcrypt");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const constants_1 = require("../constants");
let CustomerService = exports.CustomerService = class CustomerService {
    constructor(customerRepository, salonRepository) {
        this.customerRepository = customerRepository;
        this.salonRepository = salonRepository;
    }
    getCustomers() {
        return this.customerRepository.find();
    }
    async getCustomer(idToFind) {
        const customer = await this.customerRepository.findOneBy({ id: idToFind });
        if (!customer)
            throw new common_1.HttpException('customer with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return customer;
    }
    getCustomerFavorites(idToFind) {
        return this.customerRepository.findOne({ relations: ['salons'], where: { id: idToFind } });
    }
    getCustomerAppointments(idToFind) {
        return this.customerRepository.findOne({ relations: ['appointments'], where: { id: idToFind } });
    }
    createCustomer(newCustomer) {
        const password = (0, bcrypt_1.passwordToHash)(newCustomer.password);
        const role = constants_1.RoleEnum.Customer;
        const customerToSave = this.customerRepository.create(Object.assign(Object.assign({}, newCustomer), { password, role }));
        return this.customerRepository.save(customerToSave);
    }
    registerCustomer(newCustomer) {
        const customerToSave = this.customerRepository.create(Object.assign(Object.assign({}, newCustomer), { role: constants_1.RoleEnum.Customer }));
        return this.customerRepository.save(customerToSave);
    }
    updateCustomer(idToUpdate, updateDetails) {
        return this.customerRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    async assignSalonToCustomer(customerId, salonId, updateDetails) {
        const customerToUpdate = await this.customerRepository.findOne({
            relations: { salons: true },
            where: { id: customerId }
        });
        if (!customerToUpdate)
            throw new common_1.HttpException('customer cannot be found to update favorite salons', common_1.HttpStatus.NOT_FOUND);
        const salon = await this.salonRepository.findOneBy({ id: salonId });
        if (!salon)
            throw new common_1.HttpException('salon with the given id cannot be found to add to customer\'s list of favorite salons', common_1.HttpStatus.NOT_FOUND);
        const indexInFavorite = customerToUpdate.salons.indexOf(salon);
        if (updateDetails.operation == 'remove') {
            if (indexInFavorite == -1) {
                throw new common_1.HttpException("the salon is not in the customer\'s farvorite list", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                customerToUpdate.salons.splice(indexInFavorite, 1);
            }
        }
        else if (updateDetails.operation == "add") {
            if (indexInFavorite != -1) {
                throw new common_1.HttpException("the salon is already insied of the customer\'s farvorite list", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                customerToUpdate.salons.push(salon);
                return this.customerRepository.save(customerToUpdate);
            }
        }
    }
    deleteCustomer(idToDelete) {
        return this.customerRepository.delete(idToDelete);
    }
    async updateCustomerPhoto(idToUpdate, file) {
        console.log("file name in the update customer photo service: " + file.filename);
        const customerToUpdate = await this.customerRepository.findOne({ where: { id: idToUpdate } });
        if (!customerToUpdate)
            throw new common_1.HttpException('the customer with the given id cannot be found to update it\'s photos', common_1.HttpStatus.NOT_FOUND);
        const photoName = file.filename;
        console.log('customer photo string: ' + customerToUpdate.customerPhoto);
        console.log('new photo name: ' + photoName);
        if (customerToUpdate.customerPhoto == null) {
            console.log("customer photo string is null");
            customerToUpdate.customerPhoto = photoName;
            return this.salonRepository.save(customerToUpdate);
        }
        else {
            console.log("the customer photo is not empty");
            const oldPath = './pics/' + customerToUpdate.customerPhoto;
            console.log('photo old path: ' + oldPath);
            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error(err);
                        return err;
                    }
                });
            }
            console.log("photo name 1: " + customerToUpdate.customerPhoto);
            customerToUpdate.customerPhoto = file.filename;
            console.log("photo name 2: " + customerToUpdate.customerPhoto);
            return this.customerRepository.save(customerToUpdate);
        }
    }
    async getCustomerByEmail(emailToFind) {
        const customer = await this.customerRepository.findOneBy({ email: emailToFind });
        console.log("getting customer by email: " + customer);
        return customer;
    }
    async setCurrentRefreshToken(refreshTokenToUpdate, userId) {
        console.log("updating refresh token");
        console.log("customer id when saving refresh token is: " + userId);
        const refreshToken = (0, bcrypt_1.passwordToHash)(refreshTokenToUpdate);
        console.log('hashed refresh token: ' + refreshToken);
        return this.customerRepository.update(userId, { refreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        console.log("checking if refresh token matches in customer service");
        console.log("customer id when comparing refresh token is: " + userId);
        const customer = await this.getCustomer(userId);
        const isRefreshTokenMatching = (0, bcrypt_1.comparePasswordAndHash)(refreshToken, customer.refreshToken);
        if (isRefreshTokenMatching) {
            console.log("refresh token is identical, authorize new access token");
            return customer;
        }
        else {
            throw new common_1.HttpException("the refresh token does not match", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async removeRefreshToken(userId) {
        return this.customerRepository.update(userId, {
            refreshToken: ""
        });
    }
};
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(CustomerEntity_1.CustomerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map