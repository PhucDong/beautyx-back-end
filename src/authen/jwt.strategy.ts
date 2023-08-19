import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleEnum, jwtConstants } from "src/constants";
import { CustomerService } from "src/customer/customer.service";
import { ManagerService } from "src/manager/manager.service";
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(
    private readonly customerService: CustomerService,
    private readonly managerService: ManagerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log("extracting jwt from request ")
        console.log("the access token is: " + request?.cookies?.Authentication)
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: jwtConstants.secret
    });
  }
 
  async validate(payload) {
    console.log(payload)
    
    console.log("validating access token from cookie in jwt strategy")
    if (payload.role == RoleEnum.Manager){
        return this.managerService.getManager(payload.sub);
    } else if (payload.role == RoleEnum.Customer){
        return this.customerService.getCustomer(payload.sub);
    }
    
  }
}