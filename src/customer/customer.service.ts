import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getCustomers(){
        return this.customerRepository.find({relations: ['salons']});
    }
    getCustomer(idToFind: number){
        return this.customerRepository.findOneBy({id: idToFind});
    }
    
    createCustomer(newCustomer: createCustomerDto){
        const customerToSave = this.customerRepository.create({...newCustomer});
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

        console.log("the operation is: " + updateDetails.operation)

        if (updateDetails.operation == 'remove') {
            console.log("removing favorite salon from list")
            const indexToRemove = customerToUpdate.salons.indexOf(salon)
            customerToUpdate.salons.splice(indexToRemove, 1)
        } else if (updateDetails.operation == "add"){
         
            customerToUpdate.salons.push(salon)
        }

        return this.customerRepository.save(customerToUpdate)
    
    }
    deleteCustomer(idToDelete: number){
        return this.customerRepository.delete( idToDelete)
    
    }
       
}
