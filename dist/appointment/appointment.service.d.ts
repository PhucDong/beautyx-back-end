import { createAppointmentDto, updateAppointmentDto, updateAppointmentServicesDto, updateAppointmentStatusDto } from 'src/DTOs/AppointmentDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { Repository } from 'typeorm';
export declare class AppointmentService {
    private salonRepository;
    private employeeRepository;
    private customerRepository;
    private serviceRepository;
    private appointmentRepository;
    constructor(salonRepository: Repository<SalonEntity>, employeeRepository: Repository<EmployeeEntity>, customerRepository: Repository<CustomerEntity>, serviceRepository: Repository<ServiceEntity>, appointmentRepository: Repository<AppointmentEntity>);
    getAppointments(): Promise<AppointmentEntity[]>;
    getAppointment(idToFind: number): Promise<AppointmentEntity>;
    getAppointmentDetails(idToFind: number): Promise<AppointmentEntity>;
    createAppointment(salonId: number, employeeId: number, customerId: number, appointmentDetails: createAppointmentDto): Promise<AppointmentEntity>;
    updateAppointment(idToUpdate: number, updateDetails: updateAppointmentDto): Promise<import("typeorm").UpdateResult>;
    updateAppointmentServices(idToUpdate: number, updateDetails: updateAppointmentServicesDto): Promise<AppointmentEntity>;
    updateAppointmentStatus(idToUpdate: number, updateDetails: updateAppointmentStatusDto): Promise<AppointmentEntity>;
    deleteAppointment(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
