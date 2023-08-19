import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createInventoryDto, updateInventoryDto } from 'src/DTOs/InventoyDto';
import { createReviewDto, updateReviewDto } from 'src/DTOs/ReviewDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>
        ) {}

    
    getReviews(){
        return this.reviewRepository.find();
    }
    async getReview(idToFind: number){
        const review = await this.reviewRepository.findOneBy({id: idToFind});
        if (!review) throw new HttpException('reiew with the given id cannot be found', HttpStatus.NOT_FOUND)
        return review
    }
    async createReview(customerId: number, appointmentId: number, newReview: createReviewDto){
        const appointmentToUpdate = await this.appointmentRepository.findOne({
            where: { id: appointmentId },
            relations: { review: true },
        })
        if (!appointmentToUpdate) throw new HttpException('appointment cannot be found to add customer review', HttpStatus.NOT_FOUND)
        
        const customerToReview = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: { reviews: true },
        })
        if (!customerToReview) throw new HttpException('customer cannot be found to make a review', HttpStatus.NOT_FOUND)

        const reviewToSave = this.reviewRepository.create({...newReview});
        const savedReview = await this.reviewRepository.save(reviewToSave)
       
        customerToReview.reviews.push(savedReview)
        appointmentToUpdate.review = savedReview

        const updatedAppointment = await this.appointmentRepository.save(appointmentToUpdate)
        const updatedCustomer = await this.customerRepository.save(customerToReview)
        
        return savedReview
    }

    updateReview(idToUpdate: number, updateDetails: updateReviewDto){
        return this.reviewRepository.update( idToUpdate, {...updateDetails})

    }
    deleteReview(idToDelete: number){
        return this.reviewRepository.delete( idToDelete)

    }
}
