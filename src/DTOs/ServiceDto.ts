import { IsNotEmpty, IsNumber, Matches } from "class-validator"

export class createServiceDto{
    @IsNotEmpty()
    serviceName: string

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    duration: Date

    @IsNumber()
    price: number

    @IsNotEmpty()
    describption: string

}
export class updateServiceDto{

    serviceName: string
    
    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    duration: Date

    @IsNumber()
    price: number

    description: string
    
}

