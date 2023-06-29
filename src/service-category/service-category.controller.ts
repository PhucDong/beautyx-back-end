import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createServiceCategoryDto, updateServiceCategoryDto } from 'src/DTOs/ServiceCategoryDto';
import { ServiceCategoryService } from './service-category.service';

@Controller('service-category')
export class ServiceCategoryController {
    constructor(private readonly serviceCategoryService: ServiceCategoryService) {}

    @Get()
    async getServiceCategories(){
        const categories = await this.serviceCategoryService.getServiceCategories();
        return categories
    }
    
    @Get('id/:id')
    getServiceCategory(@Param('id', ParseIntPipe) idToFind: number){
        return this.serviceCategoryService.getServiceCategory(idToFind);
    }

    @Post('create/salon/id/:salonId')
    createServiceCategory(@Param('salonId', ParseIntPipe) salonId: number, @Body() newCategory: createServiceCategoryDto){
        return this.serviceCategoryService.createServiceCategory(salonId, newCategory)
    }
    
    @Put('update/id/:id')
    async updateServiceCategory(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateServiceCategoryDto){
        const updatedCategory = await this.serviceCategoryService.updateServiceCategory(idToUpdate, updateDetails)
        return updatedCategory
    }

    @Delete('delete/id/:id')
    deleteServiceCategory(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.serviceCategoryService.deleteServiceCategory(idToDelete)
    }


}



