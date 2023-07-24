import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalonService } from './salon.service';
import { createSalonDto, filterSalonDto, recommendSalonDto, sortSalonDto, updateSalonDto, updateSalonReviewDto } from 'src/DTOs/SalonDto';
import { Request } from 'express';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Express } from 'express'

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
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {

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
