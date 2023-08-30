import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleEnum } from "src/constants";
import { CustomerService } from "src/customer/customer.service";
import { ManagerService } from "src/manager/manager.service";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  
  constructor(
    private readonly customerService: CustomerService,
    private readonly managerService: ManagerService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log("extracting jwt from request ")
        //console.log("the cookie is: " + request?.cookies)
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
  }
 
  async validate(payload) {
    console.log("the payload in jwt strategy validate is: " + payload.sub, + ' ' + payload.fullName + ' ' + payload.role)
    console.log("validating access token from cookie in jwt strategy")
    console.log("user role: " + payload.role)
    if (payload.role == RoleEnum.Manager){
        const managerToReturn = await this.managerService.getManager(payload.sub);
        console.log("manager found with payload in jwt strategy: " + managerToReturn.firstname)
        return managerToReturn
    } else if (payload.role == RoleEnum.Customer){
      const customerToReturn = await this.customerService.getCustomer(payload.sub);
      console.log("customer found with payload in jwt strategy: " + customerToReturn.firstname)
      return customerToReturn
    }
  }
}