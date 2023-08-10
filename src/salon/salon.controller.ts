import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, searchSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { LoginGuard, RolesGuard } from 'src/authen/authen.guard';
import { RoleEnum, Roles } from 'src/Custom Decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

@Controller('salon')
export class SalonController {
    constructor(private readonly salonService: SalonService) {}
    
    //@Roles(RoleEnum.Customer)
    //@UseGuards(LoginGuard, RolesGuard)
    @Get('')
    async getSalons(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number){
        const salons = await this.salonService.getSalons(pageSize, pageNumber);
        return salons
    }
    @Get('keyword/:keyword/size/:pageSize/page/:pageNumber')
    async getSalonsPage(@Param() params: any){
        const salons = await this.salonService.getSalonsPage(params.pageNumber, params.pageSize, params.keyword);
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

    @Get('search/')
    searchSalon(@Param() params: any, @Body() searchKey: searchSalonDto){
        return this.salonService.searchSalon(searchKey);
    }
    @Get('search/query')
    searchSalonQuery(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number, @Query('searchKey') searchKey: string){
        // console.log('page number query: ' + pageNumber + ' ' + typeof pageNumber);
        // console.log('page size query: ' + pageSize + ' ' + typeof pageSize)
        return this.salonService.searchSalonQuery(searchKey, pageSize, pageNumber);
    }
    @Post('create')
    @UsePipes(ValidationPipe)
    createSalon(@Body() newSalon: createSalonDto){
        return this.salonService.createSalon(newSalon)
    }
    
    @Post('photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './pics',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(" ").join('_')+'_'+Date.now()+'.'+fileExtension;

                callback(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(null, false);
            } else
            cb(null, true);
        }
    }))
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is not an image');
        } else {
            const response = {
                filePath: `/salon/pictures/${file.filename}`
            };
            return response;
        }
    }

    @Get('pictures/:filename')
    async getPicture(@Param('filename') fileName, @Res() res: Response) {
        res.sendFile(fileName, {root: './pics'});
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
