import { createReviewDto, updateReviewDto } from 'src/DTOs/ReviewDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { Repository } from 'typeorm';
export declare class ReviewService {
    private reviewRepository;
    private customerRepository;
    private appointmentRepository;
    constructor(reviewRepository: Repository<ReviewEntity>, customerRepository: Repository<CustomerEntity>, appointmentRepository: Repository<AppointmentEntity>);
    getReviews(): Promise<ReviewEntity[]>;
    getReview(idToFind: number): Promise<ReviewEntity>;
    createReview(customerId: number, appointmentId: number, newReview: createReviewDto): Promise<ReviewEntity>;
    updateReview(idToUpdate: number, updateDetails: updateReviewDto): Promise<import("typeorm").UpdateResult>;
    deleteReview(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
