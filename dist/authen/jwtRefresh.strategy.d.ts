import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { CustomerService } from 'src/customer/customer.service';
import { ManagerService } from 'src/manager/manager.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly customerService;
    private readonly managerService;
    constructor(configService: ConfigService, customerService: CustomerService, managerService: ManagerService);
    validate(request: Request, payload: any): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity | import("../TypeOrms/CustomerEntity").CustomerEntity>;
}
export {};
