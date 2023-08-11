import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordAndHash } from './bcrypt';
import { CustomerService } from 'src/customer/customer.service';
import { loginDto } from 'src/DTOs/AuthenDto';
import { ManagerService } from 'src/manager/manager.service';
@Injectable()
export class AuthenService {
    //constructor(@Inject('USER_SERVICE') private readonly userService: UserService){}
    constructor(
        private customerService: CustomerService,
        private managerService: ManagerService,
        private jwtService: JwtService
        ) {}

    async customerLogin(signInDetails: loginDto){
        const customer = await this.customerService.getCustomerByEmail(signInDetails.email);
        
        if (comparePasswordAndHash(signInDetails.password, customer.password) == false) {
          throw new UnauthorizedException();
        }
        const payload = { sub: customer.id, fullName: customer.firstname + ' ' + customer.lastname, email: customer.email, roles: customer.role};
        
        return {access_token: await this.jwtService.signAsync(payload) }

        
    }
    async managerLogin(signInDetails: loginDto){
        const manager = await this.managerService.getManagerByEmail(signInDetails.email);
        
        if (comparePasswordAndHash(signInDetails.password, manager.password) == false) {
          throw new UnauthorizedException();
        }
        const payload = { sub: manager.id, fullName: manager.firstname + ' ' +  manager.lastname, email: manager.email, role: manager.role};
        
        return {access_token: await this.jwtService.signAsync(payload) }

        
    }
}
