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
exports.AuthenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("./bcrypt");
const customer_service_1 = require("../customer/customer.service");
const manager_service_1 = require("../manager/manager.service");
const constants_1 = require("../constants");
const config_1 = require("@nestjs/config");
const salon_service_1 = require("../salon/salon.service");
let AuthenService = exports.AuthenService = class AuthenService {
    constructor(jwtService, configService, customerService, managerService, salonService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.customerService = customerService;
        this.managerService = managerService;
        this.salonService = salonService;
    }
    getCookieWithJwtAccessToken(user) {
        console.log("getting cookie with access token");
        const payload = { sub: user.id, fullName: user.firstname + ' ' + user.lastname, email: user.email, role: user.role };
        const expirationTime = `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME_BY_MINUTE')}`;
        console.log("access token expiration time is: " + expirationTime + ' ' + typeof expirationTime);
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${expirationTime}s`
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expirationTime}`;
    }
    getCookieWithJwtRefreshToken(user) {
        console.log("getting the cookie with refresh token");
        const payload = { sub: user.id, fullName: user.firstname + ' ' + user.lastname, email: user.email, role: user.role };
        const expirationTime = `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME_BY_MINUTE')}`;
        console.log("refresh token expiration time is: " + expirationTime + ' ' + typeof expirationTime);
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${expirationTime}s`
        });
        if (user.role == constants_1.RoleEnum.Customer) {
            this.customerService.setCurrentRefreshToken(token, user.id);
        }
        else if (user.role == constants_1.RoleEnum.Manager) {
            this.managerService.setCurrentRefreshToken(token, user.id);
        }
        return `Refresh=${token}; HttpOnly; Path=/authen/refresh; Max-Age=${expirationTime}`;
    }
    getCookieForLogOut() {
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/authen/refresh; Max-Age=0'
        ];
    }
    async generalRegister(newUser) {
        const manager = await this.managerService.getManagerByEmail(newUser.email);
        if (manager)
            throw new common_1.HttpException("email already exist in manager database", common_1.HttpStatus.BAD_REQUEST);
        const customer = await this.customerService.getCustomerByEmail(newUser.email);
        if (customer)
            throw new common_1.HttpException("email already exist in customer database", common_1.HttpStatus.BAD_REQUEST);
        const password = (0, bcrypt_1.passwordToHash)(newUser.password);
        if (newUser.role == constants_1.RoleEnum.Customer) {
            const customerToSave = await this.customerService.registerCustomer(Object.assign(Object.assign({}, newUser), { password }));
            return customerToSave;
        }
        else if (newUser.role = constants_1.RoleEnum.Manager) {
            const managertoSave = await this.managerService.registerManager(Object.assign(Object.assign({}, newUser), { password }));
            return managertoSave;
        }
    }
    async generalLogin(loginDetails) {
        console.log("cheking login detail in authen service");
        const manager = await this.managerService.getManagerByEmail(loginDetails.email);
        const customer = await this.customerService.getCustomerByEmail(loginDetails.email);
        if (customer) {
            console.log("the user is a customer");
            if ((0, bcrypt_1.comparePasswordAndHash)(loginDetails.password, customer.password) == false) {
                throw new common_1.HttpException('Wrong customer credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
            else
                return customer;
        }
        else if (manager) {
            console.log("the user is a manager");
            if ((0, bcrypt_1.comparePasswordAndHash)(loginDetails.password, manager.password) == false) {
                throw new common_1.HttpException('Wrong manager credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
            else
                return manager;
        }
        else {
            throw new common_1.HttpException("cannot find any user with the email in the databases", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.AuthenService = AuthenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        customer_service_1.CustomerService,
        manager_service_1.ManagerService,
        salon_service_1.SalonService])
], AuthenService);
//# sourceMappingURL=authen.service.js.map