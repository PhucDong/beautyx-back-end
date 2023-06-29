import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    async getCutomers(){
        const customers = await this.customerService.getCustomers();
        return customers
    }
    @Get('id/:id')
    getCustomer(@Param('id', ParseIntPipe) idToFind: number){
        return this.customerService.getCustomer(idToFind);
    }

    @Post('create')
    createCustomer(@Body() newCustomer: createCustomerDto){
        return this.customerService.createCustomer(newCustomer)
    }
    
    @Put('update/id/:id')
    async updateCustomer(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateCustomerDto){
        const updatedCustomer = await this.customerService.updateCustomer(idToUpdate, updateDetails)
        return updatedCustomer;
    }
    @Put('id/:customerId/assign/salon/id/:salonId')
    async assignSalonToCustomer(@Param() params: any, @Body() updateDetails: updateFavoriteSalonDto){
        const updatedCustomer = await this.customerService.assignSalonToCustomer(params.customerId, params.salonId, updateDetails)
        return updatedCustomer;
    }

    @Delete('delete/id/:id')
    deleteCustomer(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.customerService.deleteCustomer(idToDelete)
    }

}
