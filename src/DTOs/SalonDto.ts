import { IsNotEmpty, Matches } from "class-validator"
import { ReviewEntity } from "src/TypeOrms/ReviewEntity"

export class createSalonDto {

    @IsNotEmpty()
    salonName: string

    @IsNotEmpty()
    salonAddress: string

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

    salonType: string

    averageRating: number
}

export class updateSalonDto {

    salonName: string

    salonAddress: string
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

}

export class querySalonDto {

    salonName: string

    salonAddress: string
    
}

export class filterSalonDto {
    keyword: string;

    page: number;
}

export class sortSalonDto {
    page: number;
}

export class recommendSalonDto {

    page: number;
}

export class updateSalonReviewDto {

    reviews: ReviewEntity[]

}