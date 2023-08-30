import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, searchSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonTypesDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { LocalAuthenGuard, LoginGuard, RolesGuard } from 'src/authen/authen.guard';
import { RoleEnum, Roles } from 'src/Custom Decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { SalonTypeEnum } from 'src/constants';
import { multerOptions } from 'src/FileUpload';

@Controller('salon')
export class SalonController {
    constructor(private readonly salonService: SalonService) {}
    
    // @Roles(RoleEnum.Manager)
    // @UseGuards(JwtAuthenGuard, RolesGuard)
    @Get('')
    async getSalons(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number, @Query("sortOption") sortOption?: string){
        const salons = await this.salonService.getSalons(pageSize, pageNumber, sortOption);
        return salons
    }
    @Get('id/:id')
    getSalon(@Param('id', ParseIntPipe) idToFind: number){
        return this.salonService.getSalon(idToFind);
    }
    @Get('keyword/:keyword/size/:pageSize/page/:pageNumber')
    async getSalonsPage(@Param() params: any){
        const salons = await this.salonService.getSalonsPage(params.pageNumber, params.pageSize, params.keyword);
        return salons
    }
    // @Roles(RoleEnum.Customer)
    // @UseGuards(JwtAuthenGuard, RolesGuard)
    @Get('/filtered/')
    async getSalonsFiltered(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number, @Query("salonType") salonType: string, @Query("sortOption") sortOption?: string){
        //console.log("the type of salon to filter: " + salonType)
        const salons = await this.salonService.getSalonsFiltered(pageSize, pageNumber, salonType, sortOption);
        return salons
    }
    @Get('search/query')
    searchSalonQuery(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number, @Query('searchKey') searchKey: string){
        return this.salonService.searchSalonQuery(searchKey, pageSize, pageNumber);
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

    @Put('update/salontype/id/:id')
    @UsePipes(ValidationPipe)
    updateSalonTypes(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonTypesDto){
        console.log('update a list of salon types')
        console.log(updateDetails)
        return this.salonService.updateSalonTypes(idToUpdate, updateDetails)
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

    @Post('/id/:salonId/upload/:imageType')
    @UseInterceptors(FileInterceptor('file', multerOptions ))
    uploadWallpaper(@UploadedFile() file: Express.Multer.File, @Param('salonId', ParseIntPipe) idToUpdate: number) {
        
        if (!file) {
            throw new BadRequestException('File is not an image');
        } else {
            //console.log("the file name of the picture in the upload controller: " + file.filename)
            return this.salonService.updateSalonPhoto(idToUpdate, file)
            // const response = {
            //     filePath: `/salon/pictures/${file.filename}`
            // };
            // return response;
        }
    }

    
    @Get('pictures/:filename')
    async getPicture(@Param('filename') fileName, @Res() res: Response) {
        res.sendFile(fileName, {root: './pics'});
    }
}
