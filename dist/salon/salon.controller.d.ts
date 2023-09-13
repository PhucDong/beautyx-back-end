/// <reference types="multer" />
import { SalonService } from './salon.service';
import { createSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonTypesDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { Response } from 'express';
export declare class SalonController {
    private readonly salonService;
    constructor(salonService: SalonService);
    getSalons(pageNumber: number, pageSize: number, sortOption?: string): Promise<any[]>;
    getSalon(idToFind: number): Promise<any>;
    getSalonsPage(params: any): Promise<{
        list: import("../TypeOrms/SalonEntity").SalonEntity[];
        count: number;
        page: number;
        pageSize: number;
    }>;
    getSalonsFiltered(pageNumber: number, pageSize: number, salonType: string, sortOption?: string): Promise<{
        salonPage: any[];
        totalPageNumber: number;
    }>;
    searchSalonQuery(pageNumber: number, pageSize: number, searchKey: string): Promise<{
        salonPage: any[];
        totalPageNumber: number;
    }>;
    getSalonServiceCategories(idToFind: number): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    getSalonAppointments(idToFind: number): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    getSalonInventories(idToFind: number): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    getSalonEmployess(idToFind: number): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    createSalon(newSalon: createSalonDto): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    updateSalon(idToUpdate: number, updateDetails: updateSalonDto): Promise<import("typeorm").UpdateResult>;
    updateSalonHighLights(idToUpdate: number, updateDetails: updateSalonHighLightsDto): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    updateSalonTypes(idToUpdate: number, updateDetails: updateSalonTypesDto): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    updateSalonWorkDay(idToUpdate: number, updateDetails: updateSalonWorkDayDto): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    updateSalonWorkDayList(idToUpdate: number, updateDetails: updateSalonWorkDayListDto): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    deleteSalon(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    uploadWallpaper(file: Express.Multer.File, idToUpdate: number): Promise<import("../TypeOrms/SalonEntity").SalonEntity>;
    getPicture(fileName: any, res: Response): Promise<void>;
}
