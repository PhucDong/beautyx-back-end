import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { CustomerService } from 'src/customer/customer.service';
import { RoleEnum } from 'src/constants';
import { ManagerService } from 'src/manager/manager.service';

 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
    private readonly managerService: ManagerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
 
  async validate(request: Request, payload) {
    console.log("validating jwt refresh token in jwt refresh token strategy")
    console.log("the payload in jwt refresh token strategy validate is: " + payload.sub + ' ' + payload.fullName + ' ' + payload.role)
    const refreshToken = request.cookies?.Refresh;
    console.log("the refresh token in the cookie: " + refreshToken)
    if (payload.role == RoleEnum.Customer) {
      return this.customerService.getUserIfRefreshTokenMatches(refreshToken, payload.sub);
    } else {
      return this.managerService.getUserIfRefreshTokenMatches(refreshToken, payload.sub)
    }
  }
}