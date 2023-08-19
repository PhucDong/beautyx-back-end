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

    @Post('create/salon/id/:id')
    @UsePipes(ValidationPipe)
    createManager(@Param('id', ParseIntPipe) salonId: number, @Body() newManager: createManagerDto){
        return this.managerService.createManager(salonId, newManager)
    }
    
    
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateManager(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: createManagerDto){
        const updatedManager = await this.managerService.updateManager(idToUpdate, updateDetails)
        return updatedManager;
    }

    @Delete('delete/id/:id')
    deleteManager(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.managerService.deleteManager(idToDelete)
    }
}
