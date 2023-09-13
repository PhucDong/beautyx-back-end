/// <reference types="multer" />
import { CustomerService } from './customer.service';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { Response } from 'express';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getCutomers(): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity[]>;
    getCustomer(idToFind: number, request: any): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    getCustomerFavorites(idToFind: number): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    getCustomerAppointments(idToFind: number): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    createCustomer(newCustomer: createCustomerDto): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    updateCustomer(idToUpdate: number, updateDetails: updateCustomerDto): Promise<import("typeorm").UpdateResult>;
    assignSalonToCustomer(params: any, updateDetails: updateFavoriteSalonDto): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    deleteCustomer(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    uploadWallpaper(file: Express.Multer.File, idToUpdate: number): Promise<import("../TypeOrms/CustomerEntity").CustomerEntity>;
    getPicture(fileName: any, res: Response): Promise<void>;
}
