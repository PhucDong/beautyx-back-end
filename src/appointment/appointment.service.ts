import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createAppointmentDto, updateAppointmentDto, updateAppointmentServicesDto, updateAppointmentStatusDto } from 'src/DTOs/AppointmentDto';
import { AppointmentEntity, ApprovalStatusEnum } from 'src/TypeOrms/AppointmentEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { In, Repository } from 'typeorm';

@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectRepository(ServiceEntity) private serviceRepository: Repository<ServiceEntity>,
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>
        ) {}

    
    getAppointments(){
        return this.appointmentRepository.find({relations: []});
    }
    async getAppointment(idToFind: number){
        const appointment = await this.appointmentRepository.findOneBy({id: idToFind});
        if (!appointment) throw new HttpException('the appointment with the given id cannot be found', HttpStatus.NOT_FOUND)
        else return appointment
    }
    getAppointmentDetails(idToFind: number){
        return this.appointmentRepository.findOne({relations: ['services', 'review'], where: {id: idToFind}});
    }
    
    async createAppointment(salonId: number, employeeId: number, customerId: number, services: createAppointmentDto){
        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { appointments: true },
        })
        if (!salonToUpdate) throw new HttpException('salnon cannot be found to add new appointment', HttpStatus.NOT_FOUND)
        
        const employeeToAssign = await this.employeeRepository.findOne({
            where: { id: employeeId },
            relations: { appointments: true },
        })
        if (!employeeToAssign) throw new HttpException('employee cannot be found to assign new appointment', HttpStatus.NOT_FOUND)
     
        const customerToBook = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: { appointments: true },
        })
        if (!customerToBook) throw new HttpException('customer cannot be found to book new appointment', HttpStatus.NOT_FOUND)

    
        const serviceList = await this.serviceRepository.find( {where: {id: In( services.services  ) } } )
        // console.log("this is the list of service the customer requested ------------------------------------")
        // console.log(serviceList)
        
        if ( serviceList.length == 0) throw new HttpException('error: there are no service id in the service list', HttpStatus.BAD_REQUEST)

        const appointnetToSave = this.appointmentRepository.create({
            salon: salonToUpdate,
            employee: employeeToAssign,
            customer: customerToBook,
            services: serviceList,
            appointmentDate: services.appointmentDate,
            startTime: services.startTime,
            estimatedEndTime: services.estimatedEndTime
        })

        const savedAppointment = await this.appointmentRepository.save(appointnetToSave)
        //console.log("this is the appointment created-------------------")
        //console.log(savedAppointment)
        salonToUpdate.appointments.push(savedAppointment)
        employeeToAssign.appointments.push(savedAppointment)
        customerToBook.appointments.push(savedAppointment)

        this.salonRepository.save(salonToUpdate)
        this.employeeRepository.save(employeeToAssign)
        this.customerRepository.save(customerToBook)

        // console.log("the time is: " + savedAppointment.startTime + " " + typeof savedAppointment.startTime)
        // console.log("the date is: " + savedAppointment.appointmentDate + " " + typeof savedAppointment.appointmentDate)

        return savedAppointment
    }

    updateAppointment(idToUpdate: number, updateDetails: updateAppointmentDto){
        return  this.appointmentRepository.update( idToUpdate, {...updateDetails});

    }
    async updateAppointmentServices(idToUpdate: number, updateDetails: updateAppointmentServicesDto){
        const appointmentToUpdate = await this.appointmentRepository.findOne({relations: ['services'], where: {id: idToUpdate}})
        if (!appointmentToUpdate) throw new HttpException('the appointment with the given id cannot be found to update the service list', HttpStatus.NOT_FOUND)
        
        const serviceList = await this.serviceRepository.find( {where: {id: In( updateDetails.services  ) } } )
        if ( serviceList.length == 0) throw new HttpException('error: there are no service id in the service list', HttpStatus.BAD_REQUEST)

        // console.log(appointmentToUpdate)
        // console.log(serviceList)
        appointmentToUpdate.services = serviceList;

        return this.appointmentRepository.save(appointmentToUpdate)
    }
    async updateAppointmentStatus(idToUpdate: number, updateDetails: updateAppointmentStatusDto){
        const appointmentToUpdate = await this.appointmentRepository.findOne({ relations: ['employee'], where: {id: idToUpdate} })
        if (!appointmentToUpdate) throw new HttpException('the appointment with the given id cannot be found to update it\' status', HttpStatus.NOT_FOUND)
        if(appointmentToUpdate.approvalStatus == ApprovalStatusEnum.COMPLETED) throw new HttpException('appointment is already completed cannot update status anymore', HttpStatus.BAD_REQUEST)
        // console.log(updateDetails.approvalStatus);
        if (updateDetails.approvalStatus == ApprovalStatusEnum.COMPLETED) {
            const employeeOfAppointment = await this.employeeRepository.findOne({where: {id: appointmentToUpdate.employee.id}})
            // console.log("appointment completed updating employee appointment count")
            employeeOfAppointment.pastAppointment += 1
            // console.log('employee\'s new number of appointments: ' + employeeOfAppointment.pastAppointment)
            this.employeeRepository.save(employeeOfAppointment);
        }
        appointmentToUpdate.approvalStatus = updateDetails.approvalStatus
        console.log(appointmentToUpdate)
        return this.appointmentRepository.save(appointmentToUpdate)        
        
    }

    deleteAppointment(idToDelete: number){
        return this.appointmentRepository.delete( idToDelete)

    }
    
}
