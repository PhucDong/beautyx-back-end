import { createEmployeeDto, getEmployeesAvailableDto, updateEmployeeDto, updateEmployeeWorkDayDto, updateEmployeeWorkDayListDto } from 'src/DTOs/EmployeeDto';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';
export declare class EmployeeService {
    private employeeRepository;
    private salonRepository;
    constructor(employeeRepository: Repository<EmployeeEntity>, salonRepository: Repository<SalonEntity>);
    getEmployees(): Promise<EmployeeEntity[]>;
    getEmployee(idToFind: number): Promise<{
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        dateOfBirth: Date;
        city: string;
        address: string;
        gender: import("../TypeOrms/Profile").GenderEnum;
        job: string;
        workDays: any[];
        salary: number;
        experience: string;
    }>;
    getEmployeeAppointments(idToFind: number): Promise<import("../TypeOrms/AppointmentEntity").AppointmentEntity[]>;
    getEmployeesAvailable(getParams: getEmployeesAvailableDto): Promise<EmployeeEntity[]>;
    createEmployee(salonId: number, newEmployee: createEmployeeDto): Promise<EmployeeEntity>;
    updateEmployee(idToUpdate: number, updateDetails: updateEmployeeDto): Promise<import("typeorm").UpdateResult>;
    updateEmployeeWorkDay(idToUpdate: number, updateDetails: updateEmployeeWorkDayDto): Promise<EmployeeEntity>;
    updateEmployeeWorkDayList(idToUpdate: number, updateDetails: updateEmployeeWorkDayListDto): Promise<EmployeeEntity>;
    deleteEmployee(idToDelete: number): Promise<import("typeorm").DeleteResult>;
    updateWorkDay(employeeToUpdate: EmployeeEntity, currentWorkDay: any): EmployeeEntity;
}
