import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, searchSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';

@Controller('salon')
export class SalonController {
    constructor(private readonly salonService: SalonService) {}

    @Get()
    async getSalons(){
        const salons = await this.salonService.getSalons();
        return salons
    }
    
    @Get('id/:id')
    getSalon(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalon(idToFind);
    }
    @Get('id/:id/service-categories')
    getSalonServiceCategories(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalonServiceCategories(idToFind);
    }
    @Get('id/:id/appointments')
    getSalonAppointments(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalonAppointments(idToFind);
    }
    @Get('id/:id/inventories')
    getSalonInventories(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalonInventories(idToFind);
    }
    @Get('id/:id/employees')
    getSalonEmployess(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalonEmployess(idToFind);
    }

    @Get('search')
    searchSalon(@Body() searchKey: searchSalonDto){
        return this.salonService.searchSalon(searchKey);
    }
    @Get('search/query')
    searchSalonQuery(@Query('searchKey') searchKey: string){
        return this.salonService.searchSalonQuery(searchKey);
    }
    @Post('create')
    @UsePipes(ValidationPipe)
    createSalon(@Body() newSalon: createSalonDto){
        return this.salonService.createSalon(newSalon)
    }
    
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateSalon(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonDto){
        const updatedSalon = await this.salonService.updateSalon(idToUpdate, updateDetails)
        return updatedSalon
    }
    
    @Put('update/highlights/id/:id')
    @UsePipes(ValidationPipe)
    updateSalonHighLights(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonHighLightsDto){
        return this.salonService.updateSalonHighLights(idToUpdate, updateDetails)
    }

    @Put('update/workdays/id/:id')
    @UsePipes(ValidationPipe)
    updateSalonWorkDay(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonWorkDayDto){
        return this.salonService.updateSalonWorkDay(idToUpdate, updateDetails)
    }
    @Put('update/workdays/list/id/:id')
    @UsePipes(ValidationPipe)
    updateSalonWorkDayList(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonWorkDayListDto){
        console.log('update a list of workdays')
        console.log(updateDetails)
        return this.salonService.updateSalonWorkDayList(idToUpdate, updateDetails)
    }
    @Delete('delete/id/:id')
    deleteSalon(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.salonService.deleteSalon(idToDelete)
    }
}
