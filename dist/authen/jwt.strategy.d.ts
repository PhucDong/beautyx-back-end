import { Strategy } from 'passport-jwt';
import { CustomerService } from "src/customer/customer.service";
import { ManagerService } from "src/manager/manager.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly customerService;
    private readonly managerService;
    private jwtService;
    private readonly configService;
    constructor(customerService: CustomerService, managerService: ManagerService, jwtService: JwtService, configService: ConfigService);
    validate(payload: any): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity | import("../TypeOrms/CustomerEntity").CustomerEntity>;
}
export {};
