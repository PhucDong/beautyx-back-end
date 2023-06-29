import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, updateSalonDto } from 'src/DTOs/SalonDto';

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

    @Post('create')
    createSalon(@Body() newSalon: createSalonDto){
        return this.salonService.createSalon(newSalon)
    }
    
    @Put('update/id/:id')
    async updateSalon(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonDto){
        const updatedSalon = await this.salonService.updateSalon(idToUpdate, updateDetails)
        return updatedSalon
    }

    @Delete('delete/id/:id')
    deleteSalon(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.salonService.deleteSalon(idToDelete)
    }
}
