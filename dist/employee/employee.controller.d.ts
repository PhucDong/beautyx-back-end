import { EmployeeService } from './employee.service';
import { createEmployeeDto, getEmployeesAvailableDto, updateEmployeeDto, updateEmployeeWorkDayDto, updateEmployeeWorkDayListDto } from 'src/DTOs/EmployeeDto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getEmployees(): Promise<import("../TypeOrms/EmployeeEntity").EmployeeEntity[]>;
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
    getEmployeesAvailable(params: getEmployeesAvailableDto): Promise<import("../TypeOrms/EmployeeEntity").EmployeeEntity[]>;
    createEmployee(salonId: number, newEmployee: createEmployeeDto): Promise<import("../TypeOrms/EmployeeEntity").EmployeeEntity>;
    updateEmployee(idToUpdate: number, updateDetails: updateEmployeeDto): Promise<import("typeorm").UpdateResult>;
    updateEmployeeWorkDay(idToUpdate: number, updateDetails: updateEmployeeWorkDayDto): Promise<import("../TypeOrms/EmployeeEntity").EmployeeEntity>;
    updateEmployeeWorkDayList(idToUpdate: number, updateDetails: updateEmployeeWorkDayListDto): Promise<import("../TypeOrms/EmployeeEntity").EmployeeEntity>;
    deleteEmployee(idToDelete: number): Promise<import("typeorm").DeleteResult>;
}
