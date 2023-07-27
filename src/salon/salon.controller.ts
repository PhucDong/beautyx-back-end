import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, filterSalonDto, recommendSalonDto, sortSalonDto, updateSalonDto, updateSalonReviewDto } from 'src/DTOs/SalonDto';
import { Request, Response } from 'express';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('salon')
export class SalonController {
    constructor(private readonly salonService: SalonService) {}

    @Get()
    async getSalons(){
        const salons = await this.salonService.getSalons();
        return salons
    }

    // @Get('namesorted')
    // async getSortSalons(@Param() page: number, currentPage: sortSalonDto){
    //     currentPage.page = page;
    //     const salons = await this.salonService.getSortSalonsByName(currentPage);

    //     // const page: number = parseInt(request.query.page as any) || 1;
    //     // const perPage = 8;
    //     // const total = await salons.getCount
    //     return salons
    // }

    @Get('namesorted')
    async getSortSalons(@Req() req: Request) {
        const salonsBuilder = await this.salonService.queryBuilder('salon');

        // if (req.query.salon) {
        //     salonsBuilder.where("salon.salonName LIKE :salon OR salon.salonAddress LIKE :salon", {salon: `%${req.query.salon}%`})
        // }

        salonsBuilder
        .leftJoin('salon.reviews', 'reviews')
        .addSelect('AVG(reviews.rating)', 'salon_averageRating')
        .groupBy('salon.id')

        const sort: any = req.query.sort;

        if (sort) {
            salonsBuilder.orderBy('salon.salonName', sort.toUpperCase())
            .addOrderBy('salon.salonAddress', sort.toUpperCase())
        }

        const page: number = parseInt(req.query.page as any) || 1;
        const perPage = 8;
        const total = await salonsBuilder.getCount();

        salonsBuilder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await salonsBuilder.getMany(),
            total,
            page,
            // last_page: Math.ceil(total/perPage)
        }
    }

    @Get('filter')
    async getFilter(@Req() req: Request) {
        const salonsBuilder = await this.salonService.queryBuilder('salon');

        if (req.query.salon) {
            salonsBuilder.where("salon.salonType LIKE :salon", {salon: `%${req.query.salon}%`})
        }

        salonsBuilder
        .leftJoin('salon.reviews', 'reviews')
        .addSelect('AVG(reviews.rating)', 'salon_averageRating')
        .orderBy('salon.salonName', 'ASC')
        .addOrderBy('salon.salonAddress', 'ASC')
        .groupBy('salon.id')

        const page: number = parseInt(req.query.page as any) || 1;
        const perPage = 8;
        const total = await salonsBuilder.getCount();

        salonsBuilder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await salonsBuilder.getMany(),
            total,
            page,
            // last_page: Math.ceil(total/perPage)
        }
    }

    @Get('recommendation')
    async getRecomnendation(@Req() req: Request) {
        const salonsBuilder = await this.salonService.queryBuilder('salon');

        salonsBuilder
        .leftJoin('salon.reviews', 'reviews')
        .addSelect('AVG(reviews.rating)', 'salon_averageRating')
        .orderBy('salon_averageRating', 'DESC')
        .addOrderBy('salon.salonName', 'ASC')
        .addOrderBy('salon.salonAddress', 'ASC')
        .groupBy('salon.id')
        

        const page: number = parseInt(req.query.page as any) || 1;
        const perPage = 8;
        const total = await salonsBuilder.getCount();

        salonsBuilder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await salonsBuilder.getMany(),
            total,
            page,
            // last_page: Math.ceil(total/perPage)
        }
    }
    
    @Get('search/query')
    searchSalonQuery(@Query("pageNumber", ParseIntPipe) pageNumber: number, @Query("pageSize", ParseIntPipe) pageSize: number, @Query('searchKey') searchKey: string){
        // console.log('page number query: ' + pageNumber + ' ' + typeof pageNumber);
        // console.log('page size query: ' + pageSize + ' ' + typeof pageSize)
        return this.salonService.searchSalonQuery(searchKey, pageSize, pageNumber);
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

    @Get('id/:id/reviews')
    getSalonReviews(@Param('id', ParseIntPipe) idToFind: number) {
        return this.salonService.getSalonReviews(idToFind);
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
                filePath: `https://rmiteduau-my.sharepoint.com/:f:/r/personal/s3700622_rmit_edu_vn/Documents/%5BCapstone%20Projects%5D%20Team%20Resilience/Resources/images/test?csf=1&web=1&e=8AkekA/salon/pictures/${file.filename}`
            };
            return response;
        }
    }

    @Get('pictures/:filename')
    async getPicture(@Param('filename') fileName, @Res() res: Response) {
        res.sendFile(fileName, {root: './pics'});
    }
    
    @Put('update/reviews/id/:id')
    @UsePipes(ValidationPipe)
    async updateSalonReview(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonReviewDto){
        const updatedSalon = await this.salonService.updateSalonReview(idToUpdate, updateDetails)
        return updatedSalon
    }

    @Put('update/id/:id')
    @UsePipes(ValidationPipe)
    async updateSalon(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateSalonDto){
        const updatedSalon = await this.salonService.updateSalon(idToUpdate, updateDetails)
        return updatedSalon
    }

    @Delete('delete/id/:id')
    deleteSalon(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.salonService.deleteSalon(idToDelete)
    }
}
