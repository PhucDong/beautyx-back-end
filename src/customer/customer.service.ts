import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/Custom Decorator/roles.decorator';
import { registerDto } from 'src/DTOs/AuthenDto';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { comparePasswordAndHash, passwordToHash } from 'src/authen/bcrypt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';


@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getCustomers(){
        return this.customerRepository.find();
    }
    async getCustomer(idToFind: number){
        const customer = await this.customerRepository.findOneBy({id: idToFind})
        if (!customer) throw new HttpException('customer with the given id cannot be found', HttpStatus.NOT_FOUND)
        
        return customer
    }
    
    getCustomerFavorites(idToFind: number){
        return this.customerRepository.findOne({relations: ['salons'], where: {id: idToFind}});
    }
    getCustomerAppointments(idToFind: number){
        return this.customerRepository.findOne({relations: ['appointments'], where: {id: idToFind}});
    }
    createCustomer(newCustomer: createCustomerDto){
        const password = passwordToHash(newCustomer.password)
        const role = RoleEnum.Customer
        const customerToSave = this.customerRepository.create({...newCustomer, password, role});
        return this.customerRepository.save(customerToSave)
    }
    registerCustomer(newCustomer: registerDto){
        return this.customerRepository.save(newCustomer)
    }

    updateCustomer(idToUpdate: number, updateDetails: updateCustomerDto){
        return this.customerRepository.update( idToUpdate, {...updateDetails})
    
    }
    async assignSalonToCustomer(customerId: number, salonId: number, updateDetails: updateFavoriteSalonDto){

        const customerToUpdate = await this.customerRepository.findOne({
            relations: {salons: true}, 
            where: {id: customerId}
        })
        if (!customerToUpdate) throw new HttpException('customer cannot be found to update favorite salons', HttpStatus.NOT_FOUND)
        
        const salon = await this.salonRepository.findOneBy({id: salonId})
        if (!salon) throw new HttpException('salon with the given id cannot be found to add to customer\'s list of favorite salons', HttpStatus.NOT_FOUND)

        // console.log("the operation is: " + updateDetails.operation)
        const indexInFavorite = customerToUpdate.salons.indexOf(salon)

        if (updateDetails.operation == 'remove') {
            // console.log("removing favorite salon from list")
            if (indexInFavorite == -1) {
                throw new HttpException("the salon is not in the customer\'s farvorite list", HttpStatus.BAD_REQUEST)
            } else {
                customerToUpdate.salons.splice(indexInFavorite, 1)
            }
            
        } else if (updateDetails.operation == "add"){
            if (indexInFavorite != -1) {
                throw new HttpException("the salon is already insied of the customer\'s farvorite list", HttpStatus.BAD_REQUEST)
            } else {
                customerToUpdate.salons.push(salon)
                return this.customerRepository.save(customerToUpdate)
            }

            
        }

        
    
    }

    deleteCustomer(idToDelete: number){
        return this.customerRepository.delete( idToDelete)
    
    }
    async updateCustomerPhoto(idToUpdate: number, file: Express.Multer.File){
        console.log("file name in the update customer photo service: " + file.filename)
        const customerToUpdate = await this.customerRepository.findOne({where: {id: idToUpdate}})

        if (!customerToUpdate) throw new HttpException('the customer with the given id cannot be found to update it\'s photos', HttpStatus.NOT_FOUND)
        const photoName = file.filename
        console.log('customer photo string: ' + customerToUpdate.customerPhoto)
        console.log('new photo name: ' + photoName)
        if (customerToUpdate.customerPhoto == null){
            console.log("customer photo string is null")
            customerToUpdate.customerPhoto = photoName
            return this.salonRepository.save(customerToUpdate);
        } else {
            console.log("the customer photo is not empty")
            const oldPath = './pics/' + customerToUpdate.customerPhoto
            console.log('photo old path: ' + oldPath)
            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error(err);
                        return err;
                    }
                });
            }
            console.log("photo name 1: " + customerToUpdate.customerPhoto)
            customerToUpdate.customerPhoto = file.filename
            console.log("photo name 2: " + customerToUpdate.customerPhoto)

            return this.customerRepository.save(customerToUpdate)
        }
        

    }


    async getCustomerByEmail(emailToFind: string){
        const customer = await this.customerRepository.findOneBy({email: emailToFind})
        //if (!customer) throw new HttpException('customer with the given email cannot be found', HttpStatus.NOT_FOUND)
        console.log("getting customer by email: " + customer)
        return customer
    }
    async setCurrentRefreshToken(refreshTokenToUpdate: string, userId: number) {
        console.log("updating refresh token")
        console.log("customer id when saving refresh token is: " + userId)
        //const refreshToken = await bcrypt.hash(refreshTokenToUpdate, 10);
        const refreshToken = passwordToHash(refreshTokenToUpdate)

        console.log('hashed refresh token: ' + refreshToken)
        // const customer = await this.getCustomer(userId)
        // customer.refreshToken = refreshToken
        // return this.customerRepository.save(customer)
        return this.customerRepository.update(userId, { refreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        console.log("checking if refresh token matches in customer service")
        console.log("customer id when comparing refresh token is: " + userId)
        const customer = await this.getCustomer(userId)
        // const isRefreshTokenMatching = await bcrypt.compare( refreshToken, customer.refreshToken );
        const isRefreshTokenMatching = comparePasswordAndHash(refreshToken, customer.refreshToken)
        if (isRefreshTokenMatching) {
            console.log("refresh token is identical, authorize new access token")
          return customer;
        } else {
            throw new HttpException("the refresh token does not match", HttpStatus.UNAUTHORIZED)
        }

    }
    async removeRefreshToken(userId: number) {
        return this.customerRepository.update(userId, {
          refreshToken: null
        });
      }

}
