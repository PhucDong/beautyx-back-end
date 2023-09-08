import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { createManagerDto } from 'src/DTOs/ManagerDto';
import { registerDto } from 'src/DTOs/AuthenDto';


@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Get()
    async getManagers(){
        const managers = await this.managerService.getManagers();
        return managers
    }
    // @Get()
    // getUsers(){
    //     return this.usersService.getUsers();
    // }
    @Get('id/:id')
    getManager(@Param('id', ParseIntPipe) idToFind: number){
        return this.managerService.getManager(idToFind);
    }
    @Get('id/:id/dashboard')
    getManagerDashboard(@Param('id', ParseIntPipe) idToFind: number){
        return this.managerService.getManagerDashboard(idToFind);
    }
    @Post('create/')
    @UsePipes(ValidationPipe)
    createManager(@Body() newManager: createManagerDto){
        return this.managerService.createManager(newManager)
    }
    
    
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateManager(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: createManagerDto){
        const updatedManager = await this.managerService.updateManager(idToUpdate, updateDetails)
        return updatedManager;
    }

    @Put('assign/manager/:managerId/to/salon/:salonId')
    @UsePipes(ValidationPipe)
    async assignManagerToSalon(@Param('managerId', ParseIntPipe) managerId: number, @Param('salonId', ParseIntPipe) salonId: number){
        const updatedManager = await this.managerService.assignManagerToSalon(managerId, salonId)
        console.log("manager assignment constroller")
        console.log(updatedManager)
        return updatedManager;
    }

    @Put('remove/manager/:managerId/from/salon/:salonId')
    @UsePipes(ValidationPipe)
    async removeManagerFromSalon(@Param('managerId', ParseIntPipe) managerId: number, @Param('salonId', ParseIntPipe) salonId: number){
        const updatedManager = await this.managerService.removeManagerFromSalon(managerId, salonId)
        return updatedManager;
    }

    @Delete('delete/id/:id')
    deleteManager(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.managerService.deleteManager(idToDelete)
    }
}
