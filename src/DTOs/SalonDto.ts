import { IsNotEmpty, Matches } from "class-validator"

export class createSalonDto {

    @IsNotEmpty()
    salonName: string

    @IsNotEmpty()
    salonAddress: string

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endtime: Date


}

export class updateSalonDto {

    salonName: string

    salonAddress: string
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

}