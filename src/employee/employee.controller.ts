import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { createEmployeeDto, getEmployeesAvailableDto, updateEmployeeDto, updateEmployeeWorkDayDto } from 'src/DTOs/EmployeeDto';

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
    @Get('id/:id/appointments')
    getEmployeeAppointments(@Param('id', ParseIntPipe) idToFind: number){
        return this.employeeService.getEmployeeAppointments(idToFind);
    }
 

    @Get('available/salon/id/:salonId')
    @UsePipes(ValidationPipe)
    getEmployeesAvailable(@Param('salonId', ParseIntPipe) salonId: number, @Body() appointmentTime: getEmployeesAvailableDto){
        return this.employeeService.getEmployeesAvailable(salonId, appointmentTime);
    }

    
    @Post('create/salon/id/:salonId')
    @UsePipes(ValidationPipe)
    createEmployee(@Param('salonId', ParseIntPipe) salonId: number, @Body() newEmployee: createEmployeeDto){
        return this.employeeService.createEmployee(salonId, newEmployee)
    }
    

    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateEmployee(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateEmployeeDto){
        const updatedEmployee = await this.employeeService.updateEmployee(idToUpdate, updateDetails)
        return updatedEmployee;
    }
    
    @Put('update/workdays/id/:id')
    @UsePipes(ValidationPipe)
    updateEmployeeWorkDay(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateEmployeeWorkDayDto){
        return this.employeeService.updateEmployeeWorkDay(idToUpdate, updateDetails)
    }


    @Delete('delete/id/:id')
    deleteEmployee(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.employeeService.deleteEmployee(idToDelete)
    }

}
