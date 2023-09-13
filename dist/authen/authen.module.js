"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenModule = void 0;
const common_1 = require("@nestjs/common");
const authen_controller_1 = require("./authen.controller");
const authen_service_1 = require("./authen.service");
const customer_module_1 = require("../customer/customer.module");
const jwt_1 = require("@nestjs/jwt");
const manager_module_1 = require("../manager/manager.module");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./local.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const ManagerEntity_1 = require("../TypeOrms/ManagerEntity");
const CustomerEntity_1 = require("../TypeOrms/CustomerEntity");
const jwt_strategy_1 = require("./jwt.strategy");
const config_1 = require("@nestjs/config");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const jwtRefresh_strategy_1 = require("./jwtRefresh.strategy");
const salon_module_1 = require("../salon/salon.module");
let AuthenModule = exports.AuthenModule = class AuthenModule {
};
exports.AuthenModule = AuthenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ManagerEntity_1.ManagerEntity, CustomerEntity_1.CustomerEntity, SalonEntity_1.SalonEntity]),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        signOptions: { expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME_BY_MINUTE')}` },
                        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                    };
                }
            }),
            customer_module_1.CustomerModule, manager_module_1.ManagerModule, salon_module_1.SalonModule, passport_1.PassportModule, config_1.ConfigModule
        ],
        controllers: [authen_controller_1.AuthenController],
        providers: [authen_service_1.AuthenService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwtRefresh_strategy_1.JwtRefreshTokenStrategy]
    })
], AuthenModule);
//# sourceMappingURL=authen.module.js.map