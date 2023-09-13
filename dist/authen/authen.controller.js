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
exports.AuthenController = void 0;
const common_1 = require("@nestjs/common");
const authen_service_1 = require("./authen.service");
const AuthenDto_1 = require("../DTOs/AuthenDto");
const customer_service_1 = require("../customer/customer.service");
const authenRefresh_guard_1 = require("./authenRefresh.guard");
const authen_guard_1 = require("./authen.guard");
const authenAccess_guard_1 = require("./authenAccess.guard");
let AuthenController = exports.AuthenController = class AuthenController {
    constructor(authenService, customerService) {
        this.authenService = authenService;
        this.customerService = customerService;
    }
    logIn(request) {
        console.log(request.user);
        const user = request.user;
        const accessTokenCookie = this.authenService.getCookieWithJwtAccessToken(user);
        const refreshTokenCookie = this.authenService.getCookieWithJwtRefreshToken(user);
        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        console.log("sending cookie and user info");
        return user;
    }
    refresh(request) {
        const accessCookie = this.authenService.getCookieWithJwtAccessToken(request.user);
        request.res.setHeader('Set-Cookie', accessCookie);
        console.log('sending new access token after refresh');
        return request.user;
    }
    async logOut(request) {
        console.log("loging out controller");
        console.log("request user: " + request.user.id + ' ' + request.user.firstname);
        const loggedOut = await this.customerService.removeRefreshToken(request.user.id);
        console.log("refresh token has been removed from user ");
        const cookie = this.authenService.getCookieForLogOut();
        request.res.setHeader('Set-Cookie', cookie);
        console.log('finished removing refresh token, now sending logout cookie');
        return loggedOut;
    }
    register(newUser) {
        console.log('registering general user, customer or manager');
        return this.authenService.generalRegister(newUser);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(authen_guard_1.LocalAuthenGuard),
    (0, common_1.Post)('general/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenController.prototype, "logIn", null);
__decorate([
    (0, common_1.UseGuards)(authenRefresh_guard_1.default),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(authenAccess_guard_1.default),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('general/register/'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenDto_1.registerDto]),
    __metadata("design:returntype", void 0)
], AuthenController.prototype, "register", null);
exports.AuthenController = AuthenController = __decorate([
    (0, common_1.Controller)('authen'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [authen_service_1.AuthenService,
        customer_service_1.CustomerService])
], AuthenController);
//# sourceMappingURL=authen.controller.js.map