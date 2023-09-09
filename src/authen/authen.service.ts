import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordAndHash, passwordToHash } from './bcrypt';
import { CustomerService } from 'src/customer/customer.service';
import { loginDto, registerDto } from 'src/DTOs/AuthenDto';
import { ManagerService } from 'src/manager/manager.service';
import { RoleEnum } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import * as bcrypt from 'bcrypt';
import { SalonService } from 'src/salon/salon.service';

@Injectable()
export class AuthenService {
    //constructor(@Inject('USER_SERVICE') private readonly userService: UserService){}
  constructor(
  
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
    private readonly managerService: ManagerService,
    private readonly salonService: SalonService

  ) {}
  
  getCookieWithJwtAccessToken(user: ManagerEntity | CustomerEntity) {
    console.log("getting cookie with access token")
    //console.log("user in cookie creator")
    const payload = { sub: user.id, fullName: user.firstname + ' ' +  user.lastname, email: user.email, role: user.role};
    // console.log("payload in get cookie with access token: " + payload.role)
    const expirationTime = `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME_BY_MINUTE')}`
    console.log("access token expiration time is: " + expirationTime + ' ' + typeof expirationTime)
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${expirationTime}s`
    });
    //console.log('jwt access token expiration time: ' + this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'))
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expirationTime}`;

  }
  getCookieWithJwtRefreshToken(user: ManagerEntity | CustomerEntity) {
    console.log("getting the cookie with refresh token")
    const payload = { sub: user.id, fullName: user.firstname + ' ' +  user.lastname, email: user.email, role: user.role};
    // console.log("payload in get cookie with refresh token: " + payload.role)
    const expirationTime = `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME_BY_MINUTE')}`
    console.log("refresh token expiration time is: " + expirationTime + ' ' + typeof expirationTime)
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${expirationTime}s`
    });
    if (user.role == RoleEnum.Customer){
      this.customerService.setCurrentRefreshToken(token, user.id);
    } else if (user.role == RoleEnum.Manager) {
      this.managerService.setCurrentRefreshToken(token, user.id);
    }
    return `Refresh=${token}; HttpOnly; Path=/authen/refresh; Max-Age=${expirationTime}`;

    // const cookie = `Refresh=${token}; HttpOnly; Path=/authen/refresh; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 60}`;
    
    // return {
    //   cookie,
    //   token
    // }
    
  }
  

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/authen/refresh; Max-Age=0'
    ];
  }
  async generalRegister(newUser: registerDto){

    const manager = await this.managerService.getManagerByEmail(newUser.email)
    if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
    const customer = await this.customerService.getCustomerByEmail(newUser.email)
    if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)
    
    const password = passwordToHash(newUser.password)
    if (newUser.role == RoleEnum.Customer){
      
      const customerToSave = await this.customerService.registerCustomer({...newUser, password})
      return customerToSave

    } else if (newUser.role = RoleEnum.Manager) {
      // const salonToUpdate = await this.salonService.getSalon(salonId)
      // console.log("new manager hashed password: " + password)
      // console.log("salon with id manager: " + salonToUpdate.manager);
      // if (salonToUpdate.manager) {
      //   throw new HttpException("salon already has a manager, only the manager salon can update new manager", HttpStatus.BAD_REQUEST)
      // }

      const managertoSave = await this.managerService.registerManager({...newUser, password})
      return managertoSave


    }
  }

async generalLogin(loginDetails: loginDto){
    console.log("cheking login detail in authen service")
    const manager = await this.managerService.getManagerByEmail(loginDetails.email)
    const customer = await this.customerService.getCustomerByEmail(loginDetails.email)

    if(customer) {
      console.log("the user is a customer")
      if (comparePasswordAndHash(loginDetails.password, customer.password) == false) {
        throw new HttpException('Wrong customer credentials provided', HttpStatus.BAD_REQUEST);
      } else return customer

    } else if (manager) {
      console.log("the user is a manager")
      if (comparePasswordAndHash(loginDetails.password, manager.password) == false) {
        throw new HttpException('Wrong manager credentials provided', HttpStatus.BAD_REQUEST);
      } else return manager

    } else {
      throw new HttpException("cannot find any user with the email in the databases", HttpStatus.NOT_FOUND)
    }
    
    // return {access_token: await this.jwtService.signAsync(payload) }

  }
  
  // async customerLogin(signInDetails: loginDto){
  //   const customer = await this.customerRepository.findOneBy({email: signInDetails.email})
        
  //   if (comparePasswordAndHash(signInDetails.password, customer.password) == false) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: customer.id, fullName: customer.firstname + ' ' + customer.lastname, email: customer.email, roles: customer.role};
        
  //   return {access_token: await this.jwtService.signAsync(payload) }
        
  // }
  
  // async managerLogin(signInDetails: loginDto){
  //   const manager = await this.managerRepository.findOneBy({email: signInDetails.email})
        
  //   if (comparePasswordAndHash(signInDetails.password, manager.password) == false) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: manager.id, fullName: manager.firstname + ' ' +  manager.lastname, email: manager.email, role: manager.role};
        
  //   return {access_token: await this.jwtService.signAsync(payload) }
        
  // }
  
  // async registerCustomer(newCustomer: registerDto){

  //   const manager = await this.managerRepository.findOneBy({email: newCustomer.email})
  //   if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
  //   const customer = await this.managerRepository.findOneBy({email: newCustomer.email})
  //   if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)

  //   const password = passwordToHash(newCustomer.password)
  //   const role = RoleEnum.Customer
  //   const customerToSave = this.customerRepository.create({...newCustomer, password, role});
  //   return this.customerRepository.save(customerToSave)
  // }

  // async registerManager(newManager: registerDto){

  //   const manager = await this.managerRepository.findOneBy({email: newManager.email})
  //   if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
  //   const customer = await this.managerRepository.findOneBy({email: newManager.email})
  //   if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)

  //   const password = passwordToHash(newManager.password)
  //   const role = RoleEnum.Manager
  //   const managerToSave = this.managerRepository.create({...newManager, password, role});

  //   return this.managerRepository.save(managerToSave)
  // }

}
