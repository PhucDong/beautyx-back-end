import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { registerCustomerDto } from 'src/DTOs/AuthenDto';

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
    @Get('id/:id/favorites')
    getCustomerFavorites(@Param('id', ParseIntPipe) idToFind: number){
        return this.customerService.getCustomerFavorites(idToFind);
    }
    @Get('id/:id/appointments')
    getCustomerAppointments(@Param('id', ParseIntPipe) idToFind: number){
        return this.customerService.getCustomerAppointments(idToFind);
    }
    
    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() newCustomer: createCustomerDto){
        return this.customerService.createCustomer(newCustomer)
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    registerCustomer(@Body() newCustomer: registerCustomerDto){
        return this.customerService.registerCustomer(newCustomer)
    }
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateCustomer(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateCustomerDto){
        const updatedCustomer = await this.customerService.updateCustomer(idToUpdate, updateDetails)
        return updatedCustomer;
    }
    
    @Put('id/:customerId/assign/salon/id/:salonId')
    @UsePipes(ValidationPipe)
    async assignSalonToCustomer(@Param() params: any, @Body() updateDetails: updateFavoriteSalonDto){
        const updatedCustomer = await this.customerService.assignSalonToCustomer(params.customerId, params.salonId, updateDetails)
        return updatedCustomer;
    }

    @Delete('delete/id/:id')
    deleteCustomer(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.customerService.deleteCustomer(idToDelete)
    }

}
