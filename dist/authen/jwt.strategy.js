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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("../constants");
const customer_service_1 = require("../customer/customer.service");
const manager_service_1 = require("../manager/manager.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let JwtStrategy = exports.JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(customerService, managerService, jwtService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    var _a, _b;
                    console.log("extracting jwt from request ");
                    console.log("the cookie is: " + ((_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication));
                    return (_b = request === null || request === void 0 ? void 0 : request.cookies) === null || _b === void 0 ? void 0 : _b.Authentication;
                }]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        this.customerService = customerService;
        this.managerService = managerService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validate(payload) {
        console.log("validating access token from cookie in jwt strategy");
        console.log("the payload in jwt strategy validate is: " + payload.sub + ' ' + payload.fullName + ' ' + payload.role);
        if (payload.role == constants_1.RoleEnum.Manager) {
            const managerToReturn = await this.managerService.getManager(payload.sub);
            console.log("manager found with payload in jwt strategy: " + managerToReturn.id + ' ' + managerToReturn.firstname);
            return managerToReturn;
        }
        else if (payload.role == constants_1.RoleEnum.Customer) {
            const customerToReturn = await this.customerService.getCustomer(payload.sub);
            console.log("customer found with payload in jwt strategy: " + customerToReturn.id + ' ' + customerToReturn.firstname);
            return customerToReturn;
        }
    }
};
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        manager_service_1.ManagerService,
        jwt_1.JwtService,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map