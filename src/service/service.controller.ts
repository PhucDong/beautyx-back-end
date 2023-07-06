import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { createEmployeeDto, updateEmployeeDto } from 'src/DTOs/EmployeeDto';
import { EmployeeService } from 'src/employee/employee.service';
import { ServiceService } from './service.service';
import { createServiceDto, updateServiceDto } from 'src/DTOs/ServiceDto';

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService){}

    @Get()
    async getServices(){
        const serivce = await this.serviceService.getServices();
        return serivce
    }
 
    @Get('id/:id')
    getService(@Param('id', ParseIntPipe) idToFind: number){
        return this.serviceService.getService(idToFind);
    }

    @Post('create/category/id/:categoryId')
    @UsePipes(ValidationPipe)
    createService(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() newService: createServiceDto){
        return this.serviceService.createService(categoryId, newService)
    }
    
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateService(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateServiceDto){
        const updatedSerivce = await this.serviceService.updateService(idToUpdate, updateDetails)
        return updatedSerivce;
    }

    @Delete('delete/id/:id')
    deleteService(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.serviceService.deleteService(idToDelete)
    }
}
