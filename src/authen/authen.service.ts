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
    @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(ManagerEntity) private managerRepository: Repository<ManagerEntity>,
    @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
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
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    //console.log('jwt access token expiration time: ' + this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'))
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1}`;

  }
  getCookieWithJwtRefreshToken(user: ManagerEntity | CustomerEntity) {
    console.log("getting the cookie with refresh token")
    const payload = { sub: user.id, fullName: user.firstname + ' ' +  user.lastname, email: user.email, role: user.role};
    // console.log("payload in get cookie with refresh token: " + payload.role)
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 60}s`
    });
    this.customerService.setCurrentRefreshToken(token, user.id);
    
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 60}`;

    // const cookie = `Refresh=${token}; HttpOnly; Path=/authen/refresh; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 60}`;
    
    // return {
    //   cookie,
    //   token
    // }
    
  }
  

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
  async generalRegister(newUser: registerDto, salonId?: number){
    const manager = await this.managerService.getManagerByEmail(newUser.email)
    console.log('new user email: ' + newUser.email)
    console.log('manager email: ' + manager) 
    if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
    // const customer = await this.managerRepository.findOneBy({email: newUser.email})
    const customer = await this.customerService.getCustomerByEmail(newUser.email)
    if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)
    const password = passwordToHash(newUser.password)
    if (newUser.role == RoleEnum.Customer){
      // const customerToSave = this.customerRepository.create({...newUser, password});
      // return this.customerRepository.save(customerToSave)
      const customerToSave = await this.customerService.registerCustomer({...newUser, password, role: RoleEnum.Customer})
      return customerToSave
    } else if (newUser.role = RoleEnum.Manager) {
      
      const salonToUpdate = await this.salonService.getSalon(salonId)
      //if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)

      if (salonToUpdate.manager != null) {
        throw new HttpException("salon already has a manager, only the manager salon can update new manager", HttpStatus.BAD_REQUEST)
      }

      // const managerToSave = this.managerRepository.create({...newUser, password});
      // const savedManager = await this.managerRepository.save(managerToSave)
      const managertoSave = await this.managerService.registerManager(salonId, newUser)

      return managertoSave


    }
  }

async generalLogin(loginDetails: loginDto){
    console.log("cheking login detail in authen service")
    const manager = await this.managerService.getManagerByEmail(loginDetails.email)
    const customer = await this.customerService.getCustomerByEmail(loginDetails.email)
    // let payload
    if(customer) {
      console.log("the user is a customer")
      // payload = { sub: customer.id, fullName: customer.firstname + ' ' + customer.lastname, email: customer.email, roles: customer.role};
      // if (comparePasswordAndHash(signInDetails.password, customer.password) == false) {
      //   throw new UnauthorizedException();
      // }
      return customer
    } else if (manager) {
      console.log("the user is a manager")
      // payload = { sub: manager.id, fullName: manager.firstname + ' ' +  manager.lastname, email: manager.email, role: manager.role};
      // if (comparePasswordAndHash(signInDetails.password, manager.password) == false) {
      //   throw new UnauthorizedException();
      // }
      return manager
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
