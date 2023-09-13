import { ReviewService } from './review.service';
import { createReviewDto, updateReviewDto } from 'src/DTOs/ReviewDto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReviews(): Promise<import("../TypeOrms/ReviewEntity").ReviewEntity[]>;
    getReview(idToFind: number): Promise<import("../TypeOrms/ReviewEntity").ReviewEntity>;
    createReview(params: any, newReview: createReviewDto): Promise<import("../TypeOrms/ReviewEntity").ReviewEntity>;
    updateReview(idToUpdate: number, updateDetails: updateReviewDto): Promise<import("typeorm").UpdateResult>;
    deleteReview(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
