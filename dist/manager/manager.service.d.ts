import { registerDto } from 'src/DTOs/AuthenDto';
import { createManagerDto } from 'src/DTOs/ManagerDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { SalonService } from 'src/salon/salon.service';
import { Repository } from 'typeorm';
export declare class ManagerService {
    private managerRepository;
    private salonRepository;
    private appointmentRepository;
    private readonly salonService;
    constructor(managerRepository: Repository<ManagerEntity>, salonRepository: Repository<SalonEntity>, appointmentRepository: Repository<AppointmentEntity>, salonService: SalonService);
    getManagers(): Promise<ManagerEntity[]>;
    getManager(idToFind: number): Promise<ManagerEntity>;
    getManagerDashboard(idToFind: number): Promise<any>;
    createManager(newManager: createManagerDto): Promise<ManagerEntity>;
    registerManager(newManager: registerDto): Promise<ManagerEntity>;
    assignManagerToSalon(managerId: number, salonId: number): Promise<import("typeorm").UpdateResult>;
    removeManagerFromSalon(managerId: number, salonId: number): Promise<import("typeorm").UpdateResult>;
    updateManager(idToUpdate: number, updateDetails: createManagerDto): Promise<import("typeorm").UpdateResult>;
    deleteManager(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    getManagerByEmail(emailToFind: string): Promise<ManagerEntity>;
    setCurrentRefreshToken(refreshTokenToUpdate: string, userId: number): Promise<import("typeorm").UpdateResult>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<ManagerEntity>;
    removeRefreshToken(userId: number): Promise<import("typeorm").UpdateResult>;
}
