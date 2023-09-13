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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AppointmentEntity_1 = require("../TypeOrms/AppointmentEntity");
const CustomerEntity_1 = require("../TypeOrms/CustomerEntity");
const EmployeeEntity_1 = require("../TypeOrms/EmployeeEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const ServiceEntity_1 = require("../TypeOrms/ServiceEntity");
const constants_1 = require("../constants");
const typeorm_2 = require("typeorm");
let AppointmentService = exports.AppointmentService = class AppointmentService {
    constructor(salonRepository, employeeRepository, customerRepository, serviceRepository, appointmentRepository) {
        this.salonRepository = salonRepository;
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
        this.serviceRepository = serviceRepository;
        this.appointmentRepository = appointmentRepository;
    }
    getAppointments() {
        return this.appointmentRepository.find({ relations: ['review', 'employee'] });
    }
    async getAppointment(idToFind) {
        const appointment = await this.appointmentRepository.findOneBy({ id: idToFind });
        if (!appointment)
            throw new common_1.HttpException('the appointment with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        else
            return appointment;
    }
    getAppointmentDetails(idToFind) {
        return this.appointmentRepository.findOne({ relations: ['services', 'review'], where: { id: idToFind } });
    }
    async createAppointment(salonId, employeeId, customerId, appointmentDetails) {
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { appointments: true },
        });
        if (!salonToUpdate)
            throw new common_1.HttpException('salnon cannot be found to add new appointment', common_1.HttpStatus.NOT_FOUND);
        const employeeToAssign = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: { appointments: true },
        });
        if (!employeeToAssign)
            throw new common_1.HttpException('employee cannot be found to assign new appointment', common_1.HttpStatus.NOT_FOUND);
        const customerToBook = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: { appointments: true },
        });
        if (!customerToBook)
            throw new common_1.HttpException('customer cannot be found to book new appointment', common_1.HttpStatus.NOT_FOUND);
        const serviceList = await this.serviceRepository.find({ where: { id: (0, typeorm_2.In)(appointmentDetails.services) } });
        if (serviceList.length == 0)
            throw new common_1.HttpException('error: there are no service id in the service list', common_1.HttpStatus.BAD_REQUEST);
        var availability = true;
        for (var j = 0; j < employeeToAssign.appointments.length; j++) {
            console.log("checking an employee appointments");
            if (employeeToAssign.appointments[j].approvalStatus == constants_1.ApprovalStatusEnum.APPROVED) {
                const dateToCheck = new Date(appointmentDetails.appointmentDate);
                const dateAssigned = employeeToAssign.appointments[j].appointmentDate;
                console.log('date of appointment assigned: ' + dateAssigned);
                console.log('date of appointment to check: ' + dateToCheck);
                if (dateAssigned.getFullYear() != dateToCheck.getFullYear()
                    || dateAssigned.getMonth() != dateToCheck.getMonth()
                    || dateAssigned.getDate() != dateToCheck.getDate()) {
                    console.log('appointment not on the same date-------------------');
                    continue;
                }
                else {
                    console.log('time of appointment assigned: ' + employeeToAssign.appointments[j].startTime + ' to ' + employeeToAssign.appointments[j].estimatedEndTime);
                    console.log('time of appointment to check: ' + appointmentDetails.startTime + ' to ' + appointmentDetails.estimatedEndTime);
                    if ((appointmentDetails.startTime >= employeeToAssign.appointments[j].startTime && appointmentDetails.startTime <= employeeToAssign.appointments[j].estimatedEndTime)
                        || (appointmentDetails.estimatedEndTime >= employeeToAssign.appointments[j].startTime && appointmentDetails.estimatedEndTime <= employeeToAssign.appointments[j].estimatedEndTime)
                        || (appointmentDetails.startTime <= employeeToAssign.appointments[j].startTime && appointmentDetails.estimatedEndTime >= employeeToAssign.appointments[j].estimatedEndTime)) {
                        console.log("overlapping appointment found---------------------");
                        throw new common_1.HttpException("the appointment overlaps with another appointment assigned to the employee", common_1.HttpStatus.BAD_REQUEST);
                        availability = false;
                        break;
                    }
                }
            }
        }
        const appointnetToSave = this.appointmentRepository.create({
            salon: salonToUpdate,
            employee: employeeToAssign,
            customer: customerToBook,
            services: serviceList,
            appointmentDate: appointmentDetails.appointmentDate,
            startTime: appointmentDetails.startTime,
            estimatedEndTime: appointmentDetails.estimatedEndTime
        });
        const savedAppointment = await this.appointmentRepository.save(appointnetToSave);
        salonToUpdate.appointments.push(savedAppointment);
        employeeToAssign.appointments.push(savedAppointment);
        customerToBook.appointments.push(savedAppointment);
        this.salonRepository.save(salonToUpdate);
        this.employeeRepository.save(employeeToAssign);
        this.customerRepository.save(customerToBook);
        return savedAppointment;
    }
    updateAppointment(idToUpdate, updateDetails) {
        return this.appointmentRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    async updateAppointmentServices(idToUpdate, updateDetails) {
        const appointmentToUpdate = await this.appointmentRepository.findOne({ relations: ['services'], where: { id: idToUpdate } });
        if (!appointmentToUpdate)
            throw new common_1.HttpException('the appointment with the given id cannot be found to update the service list', common_1.HttpStatus.NOT_FOUND);
        const serviceList = await this.serviceRepository.find({ where: { id: (0, typeorm_2.In)(updateDetails.services) } });
        if (serviceList.length == 0)
            throw new common_1.HttpException('there are no service id in the service list', common_1.HttpStatus.BAD_REQUEST);
        appointmentToUpdate.services = serviceList;
        return this.appointmentRepository.save(appointmentToUpdate);
    }
    async updateAppointmentStatus(idToUpdate, updateDetails) {
        const appointmentToUpdate = await this.appointmentRepository.findOne({ relations: ['employee'], where: { id: idToUpdate } });
        if (!appointmentToUpdate)
            throw new common_1.HttpException('the appointment with the given id cannot be found to update it\' status', common_1.HttpStatus.NOT_FOUND);
        if (appointmentToUpdate.approvalStatus == constants_1.ApprovalStatusEnum.COMPLETED)
            throw new common_1.HttpException('appointment is already completed, can no longer update status', common_1.HttpStatus.BAD_REQUEST);
        if (updateDetails.approvalStatus == constants_1.ApprovalStatusEnum.COMPLETED) {
            const employeeOfAppointment = await this.employeeRepository.findOne({ where: { id: appointmentToUpdate.employee.id } });
            employeeOfAppointment.pastAppointment += 1;
            this.employeeRepository.save(employeeOfAppointment);
        }
        else if (appointmentToUpdate.approvalStatus != constants_1.ApprovalStatusEnum.PENDING && updateDetails.approvalStatus == constants_1.ApprovalStatusEnum.CANCELLED) {
            throw new common_1.HttpException('appointment can only be cancelled when it is pending', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (appointmentToUpdate.approvalStatus != constants_1.ApprovalStatusEnum.PENDING && updateDetails.approvalStatus == constants_1.ApprovalStatusEnum.DENIED) {
            throw new common_1.HttpException('appointment can only be denied when it is pending', common_1.HttpStatus.BAD_REQUEST);
        }
        appointmentToUpdate.approvalStatus = updateDetails.approvalStatus;
        console.log(appointmentToUpdate);
        return this.appointmentRepository.save(appointmentToUpdate);
    }
    deleteAppointment(idToDelete) {
        return this.appointmentRepository.delete(idToDelete);
    }
};
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(EmployeeEntity_1.EmployeeEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(CustomerEntity_1.CustomerEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(ServiceEntity_1.ServiceEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(AppointmentEntity_1.AppointmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map