import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    async getinventories(){
        const inventories = await this.inventoryService.getinventories();
        return inventories
    }
    
    @Get('id/:id')
    getInventory(@Param('id', ParseIntPipe) idToFind: number){
        return this.inventoryService.getInventory(idToFind);
    }

    @Post('create/salon/id/:salonId')
    createInventory(@Param('salonId', ParseIntPipe) salonId: number, @Body() newInventory: createInventoryDto){
        return this.inventoryService.createInventory(salonId, newInventory)
    }
    
    @Put('update/id/:id')
    async updateInventory(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateInventoryDto){
        const updatedInventory = await this.inventoryService.updateInventory(idToUpdate, updateDetails)
        return updatedInventory;
    }

    @Delete('delete/id/:id')
    deleteInventory(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.inventoryService.deleteInventory(idToDelete)
    }

}
