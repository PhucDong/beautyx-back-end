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
exports.LocalAuthenGuard = exports.customerGuard = exports.RolesGuard = exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../Custom Decorator/roles.decorator");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
let LoginGuard = exports.LoginGuard = class LoginGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        console.log('checking the jwt token------------');
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET')
            });
            request['user'] = payload;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.LoginGuard = LoginGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], LoginGuard);
let RolesGuard = exports.RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log("required roles:\n" + requiredRoles);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("role guard user: " + user.fullName + ' ' + user.roles);
        console.log("checking user role: ");
        console.log(requiredRoles[0] == user.roles);
        return requiredRoles.some((role) => user.role == role);
    }
};
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
let customerGuard = exports.customerGuard = class customerGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("the user in the request in the customer guard: " + user.sub);
        console.log("request params: " + request.params.id);
        return (user.sub == request.params.id);
    }
};
exports.customerGuard = customerGuard = __decorate([
    (0, common_1.Injectable)()
], customerGuard);
let LocalAuthenGuard = exports.LocalAuthenGuard = class LocalAuthenGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthenGuard = LocalAuthenGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthenGuard);
//# sourceMappingURL=authen.guard.js.map