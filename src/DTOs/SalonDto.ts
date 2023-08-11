import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNotEmptyObject, Matches, ValidateNested } from "class-validator"
import { SalonTypeEnum } from "src/constants"

export class createSalonDto {

    @IsNotEmpty()
    salonName: string

    @IsNotEmpty()
    salonAddress: string

    @ValidateNested()
    @Type(() => updateSalonWorkDayDto)
    workDays: updateSalonWorkDayDto[]

    @IsNotEmpty()
    highLights: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    salonTypes: string
}

export class updateSalonDto {

    salonName: string

    salonAddress: string

    highLights: string

    description: string

    salonTypes: string

}
export class updateSalonHighLightsDto {

    @IsNotEmpty()
    highLights: string[]
    
}
export class updateSalonTypesDto {

    @IsNotEmpty()
    salonTypes: SalonTypeEnum[]
    
}
export class updateSalonWorkDayDto {

    @IsNotEmpty()
    workDay: string

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    startTime: Date

    @Matches(/^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/)
    endTime: Date

}
export class updateSalonWorkDayListDto {

    @ValidateNested()
    @Type(() => updateSalonWorkDayDto)
    workDayList: updateSalonWorkDayDto[]

}

export class searchSalonDto{

    @IsNotEmpty()
    searchStr: string
}

