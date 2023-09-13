import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';
import { loginDto, registerDto } from 'src/DTOs/AuthenDto';
import { ManagerService } from 'src/manager/manager.service';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { ConfigService } from '@nestjs/config';
import { SalonService } from 'src/salon/salon.service';
export declare class AuthenService {
    private jwtService;
    private readonly configService;
    private readonly customerService;
    private readonly managerService;
    private readonly salonService;
    constructor(jwtService: JwtService, configService: ConfigService, customerService: CustomerService, managerService: ManagerService, salonService: SalonService);
    getCookieWithJwtAccessToken(user: ManagerEntity | CustomerEntity): string;
    getCookieWithJwtRefreshToken(user: ManagerEntity | CustomerEntity): string;
    getCookieForLogOut(): string[];
    generalRegister(newUser: registerDto): Promise<ManagerEntity | CustomerEntity>;
    generalLogin(loginDetails: loginDto): Promise<ManagerEntity | CustomerEntity>;
}
