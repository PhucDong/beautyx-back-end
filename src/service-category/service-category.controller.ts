import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @Get('id/:id/services')
    getServiceCategoryServices(@Param('id', ParseIntPipe) idToFind: number){
        return this.serviceCategoryService.getServiceCategoryServices(idToFind);
    }
    
    @Post('create/salon/id/:salonId')
    @UsePipes(ValidationPipe)
    createServiceCategory(@Param('salonId', ParseIntPipe) salonId: number, @Body() newCategory: createServiceCategoryDto){
        return this.serviceCategoryService.createServiceCategory(salonId, newCategory)
    }
    
    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateServiceCategory(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateServiceCategoryDto){
        const updatedCategory = await this.serviceCategoryService.updateServiceCategory(idToUpdate, updateDetails)
        return updatedCategory
    }

    @Delete('delete/id/:id')
    deleteServiceCategory(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.serviceCategoryService.deleteServiceCategory(idToDelete)
    }


}



