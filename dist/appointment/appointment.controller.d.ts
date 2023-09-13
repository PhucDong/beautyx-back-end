import { AppointmentService } from './appointment.service';
import { createAppointmentDto, updateAppointmentDto, updateAppointmentServicesDto, updateAppointmentStatusDto } from 'src/DTOs/AppointmentDto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    getAppointments(): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity[]>;
    getAppointment(idToFind: number): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity>;
    getAppointmentDetails(idToFind: number): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity>;
    createAppointment(params: any, services: createAppointmentDto): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity>;
    updateAppointment(idToUpdate: number, updateDetails: updateAppointmentDto): Promise<import("typeorm").UpdateResult>;
    updateAppointmentServices(idToUpdate: number, updateDetails: updateAppointmentServicesDto): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity>;
    updateAppointmentStatus(idToUpdate: number, updateDetails: updateAppointmentStatusDto): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity>;
    deleteAppointment(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
