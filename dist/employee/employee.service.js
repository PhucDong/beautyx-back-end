"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const EmployeeEntity_1 = require("../TypeOrms/EmployeeEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const constants_1 = require("../constants");
const typeorm_2 = require("typeorm");
let EmployeeService = exports.EmployeeService = class EmployeeService {
    constructor(employeeRepository, salonRepository) {
        this.employeeRepository = employeeRepository;
        this.salonRepository = salonRepository;
    }
    getEmployees() {
        return this.employeeRepository.find({ relations: ['appointments'] });
    }
    async getEmployee(idToFind) {
        const employee = await this.employeeRepository.findOneBy({ id: idToFind });
        if (!employee)
            throw new common_1.HttpException('the employee with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        const workDaysList = employee.workDays.split(',');
        var workDaysListToReturn = [];
        for (var i = 0; i < workDaysList.length; i++) {
            var [dayStr, startTimeStr, endTimeStr] = workDaysList[i].split('-');
            workDaysListToReturn.push({
                workDay: dayStr,
                startTime: startTimeStr,
                endTime: endTimeStr
            });
        }
        const employeeToReturn = {
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            phone: employee.phone,
            dateOfBirth: employee.dateOfBirth,
            city: employee.city,
            address: employee.address,
            gender: employee.gender,
            job: employee.job,
            workDays: workDaysListToReturn,
            salary: employee.salary,
            experience: employee.experience
        };
        return employeeToReturn;
    }
    async getEmployeeAppointments(idToFind) {
        const employee = await this.employeeRepository.findOne({ relations: ['appointments'], where: { id: idToFind } });
        if (!employee)
            throw new common_1.HttpException('the employee with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return employee.appointments;
    }
    async getEmployeesAvailable(getParams) {
        const salonId = getParams.salonId;
        const appointmentTime = {
            appointmentDate: getParams.appointmentDate,
            startTime: getParams.startTime,
            estimatedEndTime: getParams.estimatedEndTime
        };
        const salonToFind = await this.salonRepository.findOne({ where: { id: salonId } });
        if (!salonToFind)
            throw new common_1.HttpException('the salon with the given id cannot be found to get it\'s list of available employee', common_1.HttpStatus.NOT_FOUND);
        const employees = await this.employeeRepository.find({
            relations: ['salon', 'appointments'],
            where: { salon: { id: salonToFind.id } }
        });
        console.log('list of employees belonging to the salon');
        console.log(employees);
        if (employees.length == 0) {
            throw new common_1.HttpException('the salon has no employee assigned to it', common_1.HttpStatus.NO_CONTENT);
        }
        let availableEmployees = [];
        for (var i = 0; i < employees.length; i++) {
            const employeeBeingChecked = employees[i];
            console.log("checking an employee");
            var availability = true;
            for (var j = 0; j < employeeBeingChecked.appointments.length; j++) {
                console.log("checking an employee appointments");
                if (employeeBeingChecked.appointments[j].approvalStatus == constants_1.ApprovalStatusEnum.APPROVED) {
                    const dateToCheck = new Date(appointmentTime.appointmentDate);
                    const dateAssigned = employeeBeingChecked.appointments[j].appointmentDate;
                    console.log('date of appointment assigned: ' + dateAssigned);
                    console.log('date of appointment to check: ' + dateToCheck);
                    if (dateAssigned.getFullYear() != dateToCheck.getFullYear()
                        || dateAssigned.getMonth() != dateToCheck.getMonth()
                        || dateAssigned.getDate() != dateToCheck.getDate()) {
                        console.log('appointment not on the same date-------------------');
                        continue;
                    }
                    else {
                        console.log('time of appointment assigned: ' + employeeBeingChecked.appointments[j].startTime + ' to ' + employeeBeingChecked.appointments[j].estimatedEndTime);
                        console.log('time of appointment to check: ' + appointmentTime.startTime + ' to ' + appointmentTime.estimatedEndTime);
                        if ((appointmentTime.startTime >= employeeBeingChecked.appointments[j].startTime && appointmentTime.startTime <= employeeBeingChecked.appointments[j].estimatedEndTime)
                            || (appointmentTime.estimatedEndTime >= employeeBeingChecked.appointments[j].startTime && appointmentTime.estimatedEndTime <= employeeBeingChecked.appointments[j].estimatedEndTime)
                            || (appointmentTime.startTime <= employeeBeingChecked.appointments[j].startTime && appointmentTime.estimatedEndTime >= employeeBeingChecked.appointments[j].estimatedEndTime)) {
                            console.log("overlapping appointment found---------------------");
                            availability = false;
                            break;
                        }
                    }
                }
            }
            if (availability == true) {
                console.log('current employee added to available list');
                availableEmployees.push(employeeBeingChecked);
            }
        }
        return availableEmployees;
    }
    async createEmployee(salonId, newEmployee) {
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { employees: true },
        });
        if (!salonToUpdate)
            throw new common_1.HttpException('salon cannot be found to add new employee', common_1.HttpStatus.NOT_FOUND);
        var workDays = '';
        for (var i = 0; i < newEmployee.workDays.length; i++) {
            const currentWorkDay = newEmployee.workDays[i];
            workDays += currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime + ',';
        }
        if (workDays.charAt(workDays.length - 1) == ',') {
            workDays = workDays.substring(0, workDays.length - 1);
        }
        const employeeToSave = this.employeeRepository.create(Object.assign(Object.assign({}, newEmployee), { workDays }));
        const savedEmployee = await this.employeeRepository.save(employeeToSave);
        salonToUpdate.employees.push(savedEmployee);
        const updatedSalon = await this.salonRepository.save(salonToUpdate);
        return savedEmployee;
    }
    updateEmployee(idToUpdate, updateDetails) {
        return this.employeeRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    async updateEmployeeWorkDay(idToUpdate, updateDetails) {
        const employeeToUpdate = await this.employeeRepository.findOne({ where: { id: idToUpdate } });
        if (!employeeToUpdate)
            throw new common_1.HttpException('the employee with the given id cannot be found to update the workday', common_1.HttpStatus.NOT_FOUND);
        const employeeUpdated = this.updateWorkDay(employeeToUpdate, updateDetails);
        return this.employeeRepository.save(employeeToUpdate);
    }
    async updateEmployeeWorkDayList(idToUpdate, updateDetails) {
        const employeeToUpdate = await this.employeeRepository.findOne({ where: { id: idToUpdate } });
        if (!employeeToUpdate)
            throw new common_1.HttpException('the employee with the given id cannot be found to update the workday', common_1.HttpStatus.NOT_FOUND);
        let employeeUpdated;
        for (var i = 0; i < updateDetails.workDayList.length; i++) {
            const currentWorkDay = updateDetails.workDayList[i];
            employeeUpdated = this.updateWorkDay(employeeToUpdate, currentWorkDay);
        }
        return this.employeeRepository.save(employeeUpdated);
    }
    deleteEmployee(idToDelete) {
        return this.employeeRepository.delete(idToDelete);
    }
    updateWorkDay(employeeToUpdate, currentWorkDay) {
        const workDayStr = currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime;
        const indexToFind = employeeToUpdate.workDays.indexOf(currentWorkDay.workDay);
        if (indexToFind == -1) {
            if (employeeToUpdate.workDays == '') {
                employeeToUpdate.workDays = workDayStr;
            }
            else {
                employeeToUpdate.workDays = employeeToUpdate.workDays + ',' + workDayStr;
            }
        }
        else {
            const leftString = employeeToUpdate.workDays.substring(0, indexToFind);
            const rightString = employeeToUpdate.workDays.substring(indexToFind + workDayStr.length + 1);
            employeeToUpdate.workDays = leftString + ',' + rightString;
            if (employeeToUpdate.workDays.charAt(employeeToUpdate.workDays.length - 1) == ',') {
                employeeToUpdate.workDays = employeeToUpdate.workDays.substring(0, employeeToUpdate.workDays.length - 1);
            }
        }
        return employeeToUpdate;
    }
};
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeEntity_1.EmployeeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map