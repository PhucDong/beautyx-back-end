import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { createEmployeeDto, updateEmployeeDto } from 'src/DTOs/EmployeeDto';

@Controller('employee')
export class EmployeeController {
    
    constructor(private readonly employeeService: EmployeeService){}

    @Get()
    async getEmployees(){
        const employees = await this.employeeService.getEmployees();
        return employees
    }
 
    @Get('id/:id')
    getEmployee(@Param('id', ParseIntPipe) idToFind: number){
        return this.employeeService.getEmployee(idToFind);
    }

    @Post('create/salon/id/:salonId')
    createEmployee(@Param('salonId', ParseIntPipe) salonId: number, @Body() newEmployee: createEmployeeDto){
        return this.employeeService.createEmployee(salonId, newEmployee)
    }
    
    @Put('update/id/:id')
    async updateEmployee(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateEmployeeDto){
        const updatedEmployee = await this.employeeService.updateEmployee(idToUpdate, updateDetails)
        return updatedEmployee;
    }

    @Delete('delete/id/:id')
    deleteEmployee(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.employeeService.deleteEmployee(idToDelete)
    }

}
