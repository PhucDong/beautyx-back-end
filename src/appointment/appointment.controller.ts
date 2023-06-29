import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { createAppointmentDto, updateAppointmentDto } from 'src/DTOs/AppointmentDto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService){}

    @Get()
    async getAppointments(){
        const appointments = await this.appointmentService.getAppointments();
        return appointments
    }
 
    @Get('id/:id')
    getAppointment(@Param('id', ParseIntPipe) idToFind: number){
        return this.appointmentService.getAppointment(idToFind);
    }

    @Post('create/salon/id/:salonId/employee/id/:employeeId/customer/id/:customerId')
    createAppointment(@Param() params: any, @Body() services: createAppointmentDto){
        return this.appointmentService.createAppointment(params.salonId, params.employeeId, params.customerId, services)
    }
    
    @Put('update/id/:id')
    async updateAppointment(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateAppointmentDto){
        const updatedSerivce = await this.appointmentService.updateAppointment(idToUpdate, updateDetails)
        return updatedSerivce;
    }

    @Delete('delete/id/:id')
    deleteAppointment(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.appointmentService.deleteAppointment(idToDelete)
    }


}
