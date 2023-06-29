import { IsNotEmpty } from "class-validator"

export class createSalonDto {

    @IsNotEmpty()
    salonName: string

    @IsNotEmpty()
    salonAddress: string

    @IsNotEmpty()
    startTime: Date
    
    @IsNotEmpty()
    endtime: Date


}

export class updateSalonDto {

    salonName: string

    salonAddress: string
    
    startTime: Date
    
    endtime: Date

}