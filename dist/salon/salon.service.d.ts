/// <reference types="multer" />
import { createSalonDto, updateSalonDto, updateSalonHighLightsDto, updateSalonTypesDto, updateSalonWorkDayDto, updateSalonWorkDayListDto } from 'src/DTOs/SalonDto';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';
export declare class SalonService {
    private salonRepository;
    private reviewRepository;
    constructor(salonRepository: Repository<SalonEntity>, reviewRepository: Repository<ReviewEntity>);
    getSalons(pageSize: number, pageNumber: number, sortOption?: string): Promise<any[]>;
    getSalonsPage(page: number, pageSize: number, keyword: string): Promise<{
        list: SalonEntity[];
        count: number;
        page: number;
        pageSize: number;
    }>;
    getSalonsFiltered(pageSize: number, pageNumber: number, salonType: string, sortOption?: string): Promise<{
        salonPage: any[];
        totalPageNumber: number;
    }>;
    searchSalonQuery(searchKey: string, pageSize: number, pageNumber: number): Promise<{
        salonPage: any[];
        totalPageNumber: number;
    }>;
    getSalon(idToFind: number): Promise<any>;
    getSalonServiceCategories(idToFind: number): Promise<SalonEntity>;
    getSalonAppointments(idToFind: number): Promise<SalonEntity>;
    getSalonInventories(idToFind: number): Promise<SalonEntity>;
    getSalonEmployess(idToFind: number): Promise<SalonEntity>;
    createSalon(newSalon: createSalonDto): Promise<SalonEntity>;
    updateSalon(idToUpdate: number, updateDetails: updateSalonDto): Promise<import("typeorm").UpdateResult>;
    updateSalonHighLights(idToUpdate: number, updateDetails: updateSalonHighLightsDto): Promise<SalonEntity>;
    updateSalonTypes(idToUpdate: number, updateDetails: updateSalonTypesDto): Promise<SalonEntity>;
    updateSalonWorkDay(idToUpdate: number, updateDetails: updateSalonWorkDayDto): Promise<SalonEntity>;
    updateSalonWorkDayList(idToUpdate: number, updateDetails: updateSalonWorkDayListDto): Promise<SalonEntity>;
    deleteSalon(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    updateSalonPhoto(idToUpdate: number, file: Express.Multer.File): Promise<SalonEntity>;
    workDayStringToArray(workDayStr: string): any[];
    formatSalonForDisplay(salon: any): Promise<any>;
    customPagination(salons: any, salonLength: number, pageSize: number, pageNumber: number): {
        salonPage: any[];
        totalPageNumber: number;
    };
    formatAndSortSalons(salons: any, sortOption?: string): Promise<any[]>;
    updateWorkDay(salonWorkDay: any, workDayToUpdate: any): any;
    quickSortSalonRating(arr: any): any;
    quickSortSalonName(arr: any): any;
    quickSortSearchScore(arr: any): any;
}
