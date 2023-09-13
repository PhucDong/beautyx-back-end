/// <reference types="multer" />
import { registerDto } from 'src/DTOs/AuthenDto';
import { createCustomerDto, updateCustomerDto, updateFavoriteSalonDto } from 'src/DTOs/CustomerDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';
export declare class CustomerService {
    private customerRepository;
    private salonRepository;
    constructor(customerRepository: Repository<CustomerEntity>, salonRepository: Repository<SalonEntity>);
    getCustomers(): Promise<CustomerEntity[]>;
    getCustomer(idToFind: number): Promise<CustomerEntity>;
    getCustomerFavorites(idToFind: number): Promise<CustomerEntity>;
    getCustomerAppointments(idToFind: number): Promise<CustomerEntity>;
    createCustomer(newCustomer: createCustomerDto): Promise<CustomerEntity>;
    registerCustomer(newCustomer: registerDto): Promise<CustomerEntity>;
    updateCustomer(idToUpdate: number, updateDetails: updateCustomerDto): Promise<import("typeorm").UpdateResult>;
    assignSalonToCustomer(customerId: number, salonId: number, updateDetails: updateFavoriteSalonDto): Promise<CustomerEntity>;
    deleteCustomer(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    updateCustomerPhoto(idToUpdate: number, file: Express.Multer.File): Promise<CustomerEntity>;
    getCustomerByEmail(emailToFind: string): Promise<CustomerEntity>;
    setCurrentRefreshToken(refreshTokenToUpdate: string, userId: number): Promise<import("typeorm").UpdateResult>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<CustomerEntity>;
    removeRefreshToken(userId: number): Promise<import("typeorm").UpdateResult>;
}
