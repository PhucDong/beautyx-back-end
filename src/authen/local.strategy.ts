import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { loginDto } from 'src/DTOs/AuthenDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';

 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenService: AuthenService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, password: string) {
    console.log("validating login details in local strategy")
    const loginDetails: loginDto = {
        email: email,
        password: password
    }
    return this.authenService.generalLogin(loginDetails);
  }

//   async validateCustomer(email: string, password: string) {
//     const loginDetails: loginDto = {
//         email: email,
//         password: password
//     }
//     return this.authenService.customerLogin(loginDetails);
//   }
//   async validateManager(email: string, password: string) {
//     const loginDetails: loginDto = {
//         email: email,
//         password: password
//     }
//     return this.authenService.managerLogin(loginDetails);
//   }
}