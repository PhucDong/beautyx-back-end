import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createAppointmentDto, updateAppointmentDto } from 'src/DTOs/AppointmentDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
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
        return this.appointmentRepository.find({relations: ['review', 'employee', 'customer', 'services', 'salon']});
    }
    getAppointment(idToFind: number){
       return this.appointmentRepository.findOneBy({id: idToFind});
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

        const serviceList = await this.serviceRepository.find( {where: {id: In( services.services ) } } )
        console.log("this is the list of service the customer requested -----------------")
        console.log(serviceList)

        const appointnetToSave = this.appointmentRepository.create({
            salon: salonToUpdate,
            employee: employeeToAssign,
            customer: customerToBook,
            services: serviceList,
        })

        const savedAppointment = await this.appointmentRepository.save(appointnetToSave)
        console.log("this is the appointment created-------------------")
        console.log(savedAppointment
            )
        salonToUpdate.appointments.push(savedAppointment)
        employeeToAssign.appointments.push(savedAppointment)
        customerToBook.appointments.push(savedAppointment)

        this.salonRepository.save(salonToUpdate)
        this.employeeRepository.save(employeeToAssign)
        this.customerRepository.save(customerToBook)

        return savedAppointment
    }

    updateAppointment(idToUpdate: number, updateDetails: updateAppointmentDto){
        return  this.appointmentRepository.update( idToUpdate, {...updateDetails});

    }
    
    deleteAppointment(idToDelete: number){
        return this.appointmentRepository.delete( idToDelete)

    }
    
}
