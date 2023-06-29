import { IsNotEmpty, IsNumber } from "class-validator"

export class createServiceDto{
    @IsNotEmpty()
    serviceName: string

    @IsNotEmpty()
    duration: Date

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    describption: string

}
export class updateServiceDto{
    serviceName: string

    duration: Date

    @IsNumber()
    price: number

    describption: string
    
}

