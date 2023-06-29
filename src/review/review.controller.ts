import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';
import { createReviewDto, updateReviewDto } from 'src/DTOs/ReviewDto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get()
    async getReviews(){
        const reviews = await this.reviewService.getReviews();
        return reviews
    }
    
    @Get('id/:id')
    getReview(@Param('id', ParseIntPipe) idToFind: number){
        return this.reviewService.getReview(idToFind);
    }

    @Post('create/customer/id/:customerId/appointment/id/:appointmentId')
    createReview(@Param() params: any, @Body() newReview: createReviewDto){
        return this.reviewService.createReview(params.customerId, params.appointmentId, newReview)
    }
    
    @Put('update/id/:id')
    async updateReview(@Param('id', ParseIntPipe) idToUpdate: number, @Body() updateDetails: updateReviewDto){
        const updatedInventory = await this.reviewService.updateReview(idToUpdate, updateDetails)
        return updatedInventory;
    }

    @Delete('delete/id/:id')
    deleteReview(@Param('id', ParseIntPipe) idToDelete: number,){
        return this.reviewService.deleteReview(idToDelete)
    }
}
