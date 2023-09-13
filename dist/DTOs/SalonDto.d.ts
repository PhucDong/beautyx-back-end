import { SalonTypeEnum } from "src/constants";
export declare class createSalonDto {
    salonName: string;
    salonAddress: string;
    workDays: updateSalonWorkDayDto[];
    highLights: string;
    description: string;
    salonTypes: string;
}
export declare class updateSalonDto {
    salonName: string;
    salonAddress: string;
    highLights: string;
    description: string;
    salonTypes: string;
}
export declare class updateSalonHighLightsDto {
    highLights: string[];
}
export declare class updateSalonTypesDto {
    salonTypes: SalonTypeEnum[];
}
export declare class updateSalonWorkDayDto {
    workDay: string;
    startTime: Date;
    endTime: Date;
}
export declare class updateSalonWorkDayListDto {
    workDayList: updateSalonWorkDayDto[];
}
export declare class searchSalonDto {
    searchStr: string;
}
