import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/Custom Decorator/roles.decorator';
import { registerDto } from 'src/DTOs/AuthenDto';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { passwordToHash } from 'src/authen/bcrypt';
import { Repository } from 'typeorm';

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
       
    async getCustomerByEmail(emailToFind: string){
        const customer = await this.customerRepository.findOneBy({email: emailToFind})
        if (!customer) throw new HttpException('customer with the given email cannot be found', HttpStatus.NOT_FOUND)
        
        return customer
    }
}
