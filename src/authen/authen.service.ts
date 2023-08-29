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
@Injectable()
export class AuthenService {
    //constructor(@Inject('USER_SERVICE') private readonly userService: UserService){}
  constructor(
    @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(ManagerEntity) private managerRepository: Repository<ManagerEntity>,
    @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  
  public getCookieWithJwtToken(user: ManagerEntity | CustomerEntity) {
    console.log("getting cookie with access token")
    console.log("user in cookie creator")
    const payload = { sub: user.id, fullName: user.firstname + ' ' +  user.lastname, email: user.email, role: user.role};
    const token = this.jwtService.sign(payload);
    console.log('jwt token expiration time: ' + this.configService.get('JWT_EXPIRATION_TIME'))
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME') * 60}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
  async generalRegister(newUser: registerDto, salonId?: number){
    if (newUser.role == RoleEnum.Customer){

      const manager = await this.managerRepository.findOneBy({email: newUser.email})
      if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
      const customer = await this.managerRepository.findOneBy({email: newUser.email})
      if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)

      const password = passwordToHash(newUser.password)
      
      const customerToSave = this.customerRepository.create({...newUser, password});
      return this.customerRepository.save(customerToSave)
    } else if (newUser.role = RoleEnum.Manager) {

      const manager = await this.managerRepository.findOneBy({email: newUser.email})
      if (manager) throw new HttpException("email already exist in manager database", HttpStatus.BAD_REQUEST)
      const customer = await this.managerRepository.findOneBy({email: newUser.email})
      if (customer) throw new HttpException("email already exist in customer database", HttpStatus.BAD_REQUEST)
      const salonToUpdate = await this.salonRepository.findOneBy({id: salonId})
      if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)

      if (salonToUpdate.manager != null) {
        throw new HttpException("salon already has a manager, only the manager salon can update new manager", HttpStatus.BAD_REQUEST)
      }

      const password = passwordToHash(newUser.password)
      const managerToSave = this.managerRepository.create({...newUser, password});
      const savedManager = await this.managerRepository.save(managerToSave)
  
      salonToUpdate.manager = savedManager
      const updatedSalon = await this.salonRepository.save(salonToUpdate)
      console.log('this is the updated salon with new manager')
      // console.log(updatedSalon)

      return savedManager


    }
  }

async generalLogin(signInDetails: loginDto){
    console.log("cheking login detail in authen service")
    const customer = await this.customerRepository.findOneBy({email: signInDetails.email})
    const manager = await this.managerRepository.findOneBy({email: signInDetails.email})
    // let payload
    if(customer) {
      // payload = { sub: customer.id, fullName: customer.firstname + ' ' + customer.lastname, email: customer.email, roles: customer.role};
      // if (comparePasswordAndHash(signInDetails.password, customer.password) == false) {
      //   throw new UnauthorizedException();
      // }
      return customer
    } else if (manager) {
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
