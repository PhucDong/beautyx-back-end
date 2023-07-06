import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class createReviewDto {
    
    @Min(0)
    @Max(5)
    @IsNumber()
    rating: number

    comment: string

}

export class updateReviewDto {

    @Min(0)
    @Max(5)
    @IsNumber()
    rating: number

    comment: string

}