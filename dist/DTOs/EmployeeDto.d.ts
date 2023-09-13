import { GenderEnum } from "src/TypeOrms/Profile";
export declare class createEmployeeDto {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    city: string;
    address: string;
    gender: GenderEnum;
    job: string;
    workDays: updateEmployeeWorkDayDto[];
    salary: number;
    experience: string;
}
export declare class updateEmployeeDto {
    fisrtnames: string;
    lastname: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    city: string;
    address: string;
    gender: GenderEnum;
    job: string;
    workDays: string;
    salary: number;
    experience: string;
    pastAppointment: number;
    rating: number;
}
export declare class updateEmployeeWorkDayDto {
    workDay: string;
    startTime: Date;
    endTime: Date;
}
export declare class updateEmployeeWorkDayListDto {
    workDayList: updateEmployeeWorkDayDto[];
}
export declare class getEmployeesAvailableDto {
    salonId: number;
    appointmentDate: Date;
    startTime: Date;
    estimatedEndTime: Date;
}
