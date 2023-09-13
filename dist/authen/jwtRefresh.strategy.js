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
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const customer_service_1 = require("../customer/customer.service");
const constants_1 = require("../constants");
const manager_service_1 = require("../manager/manager.service");
let JwtRefreshTokenStrategy = exports.JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(configService, customerService, managerService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
                }]),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.customerService = customerService;
        this.managerService = managerService;
    }
    async validate(request, payload) {
        var _a;
        console.log("validating jwt refresh token in jwt refresh token strategy");
        console.log("the payload in jwt refresh token strategy validate is: " + payload.sub + ' ' + payload.fullName + ' ' + payload.role);
        const refreshToken = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
        console.log("the refresh token in the cookie: " + refreshToken);
        if (payload.role == constants_1.RoleEnum.Customer) {
            console.log("user requesting new access token after refresh is customer");
            return this.customerService.getUserIfRefreshTokenMatches(refreshToken, payload.sub);
        }
        else if (payload.role == constants_1.RoleEnum.Manager) {
            console.log("user requesting new access token after refresh is customer");
            return this.managerService.getUserIfRefreshTokenMatches(refreshToken, payload.sub);
        }
    }
};
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        customer_service_1.CustomerService,
        manager_service_1.ManagerService])
], JwtRefreshTokenStrategy);
//# sourceMappingURL=jwtRefresh.strategy.js.map