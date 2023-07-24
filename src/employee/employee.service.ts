import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createEmployeeDto, getEmployeesAvailableDto, updateEmployeeDto, updateEmployeeWorkDayDto } from 'src/DTOs/EmployeeDto';
import { AppointmentEntity, ApprovalStatusEnum } from 'src/TypeOrms/AppointmentEntity';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getEmployees(){
        return this.employeeRepository.find({relations: []});
    }
    getEmployee(idToFind: number){
       return this.employeeRepository.findOneBy({id: idToFind});
    }
    getEmployeeAppointments(idToFind: number){
        return this.employeeRepository.findOne({relations: ['appointments'], where: {id: idToFind}});
     }
 
    async getEmployeesAvailable(salonId: number, appointmentTime: getEmployeesAvailableDto){
        const salonToFind = await this.salonRepository.findOne({where: {id: salonId}})
        const employees = await this.employeeRepository.find({
            relations: ['salon', 'appointments'], 
            where: {salon: salonToFind}
        })
        console.log('list of employees belonging to the salon')
        console.log(employees)

        let availableEmployees: EmployeeEntity[] = [];
        
        for (var i = 0; i < employees.length; i++){
            const employeeChecking = employees[i];

            var availability: Boolean = true;

            for (var j = 0; j < employeeChecking.appointments.length; j++){
                if(employeeChecking.appointments[j].approvalStatus == ApprovalStatusEnum.APPROVED){
                    const dateToCheck = new Date(appointmentTime.appointmentDate)
                    const dateAssigned = employeeChecking.appointments[j].appointmentDate

                    console.log('date of appointment assigned: ' + dateAssigned)
                    console.log('date of appointment to check: ' + dateToCheck)
                 
                    if(dateAssigned.getFullYear() != dateToCheck.getFullYear() 
                    || dateAssigned.getMonth() != dateToCheck.getMonth() 
                    || dateAssigned.getDate() != dateToCheck.getDate() 
                    ){
                        console.log('appointment not on the same date-------------------')
                        continue
                    } else {

                        console.log('time of appointment assigned: ' + employeeChecking.appointments[j].startTime + ' to ' + employeeChecking.appointments[j].estimatedEndTime)
                        console.log('time of appointment to check: ' + appointmentTime.startTime + ' to ' + appointmentTime.estimatedEndTime)

                        if ( (appointmentTime.startTime >= employeeChecking.appointments[j].startTime && appointmentTime.startTime <= employeeChecking.appointments[j].estimatedEndTime)
                            || (appointmentTime.estimatedEndTime >= employeeChecking.appointments[j].startTime && appointmentTime.estimatedEndTime <= employeeChecking.appointments[j].estimatedEndTime) 
                            || (appointmentTime.startTime <= employeeChecking.appointments[j].startTime && appointmentTime.estimatedEndTime >= employeeChecking.appointments[j].estimatedEndTime)) {
                                console.log("overlapping appointment found---------------------")
                                availability = false;
                                break;
                            }
                    }
                }

            }
            if (availability == true){
                console.log('current employee added to available list')
                availableEmployees.push(employeeChecking)
            }
            
        }

        return availableEmployees

    }

    async createEmployee(salonId: number, newEmployee: createEmployeeDto){
        // const userToSave = this.userRepository.create({
        //     firstname: newEmployee.fisrtname,
        //     lastname: newEmployee.lastname,
        //     email: newEmployee.email,
        //     phone: newEmployee.phone,
        //     dateOfBirth: newEmployee.dateOfBirth,
        //     city: newEmployee.city,
        //     address: newEmployee.address,
        //     gender: newEmployee.gender
        // });
        // const savedUser = await this.userRepository.save(userToSave)
    
        // const employeeToSave = this.employeeRepository.create({
        //     job: newEmployee.job,
        //     startTime: newEmployee.startTime,
        //     endTime: newEmployee.endTime,
        //     salary: newEmployee.salary,
        //     experience: newEmployee.experience,
        // });
        // employeeToSave.user = savedUser

        // const userToSave = this.userRepository.create({...newEmployee});
        // const savedUser = await this.userRepository.save(userToSave)

        const salonToUpdate = await this.salonRepository.findOne({
            where: { id: salonId },
            relations: { employees: true },
        })
        if (!salonToUpdate) throw new HttpException('salon cannot be found to add new employee', HttpStatus.NOT_FOUND)
     
        const employeeToSave = this.employeeRepository.create({...newEmployee});
        const savedEmployee = await this.employeeRepository.save(employeeToSave)
       
        salonToUpdate.employees.push(savedEmployee)
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
     
        return savedEmployee
    }
    updateEmployee(idToUpdate: number, updateDetails: updateEmployeeDto){
        return this.employeeRepository.update( idToUpdate, {...updateDetails});

    }
    async updateEmployeeWorkDay(idToUpdate: number, updateDetails: updateEmployeeWorkDayDto){
        const employeeToUpdate = await this.employeeRepository.findOne({where: {id: idToUpdate}})
        const indexToFind = employeeToUpdate.workDays.indexOf(updateDetails.workDays)
        if (indexToFind == -1){
            if (employeeToUpdate.workDays == ''){
                employeeToUpdate.workDays = updateDetails.workDays
            } else {
                employeeToUpdate.workDays = employeeToUpdate.workDays + ',' + updateDetails.workDays
            }
        } else {
            const leftString = employeeToUpdate.workDays.substring(0, indexToFind);
            const rightString = employeeToUpdate.workDays.substring(indexToFind + updateDetails.workDays.length + 1);
            employeeToUpdate.workDays = leftString + rightString
            if (employeeToUpdate.workDays.charAt(employeeToUpdate.workDays.length - 1) == ','){
                employeeToUpdate.workDays = employeeToUpdate.workDays.substring(0, employeeToUpdate.workDays.length - 1)
            }

        }
        return this.employeeRepository.save(employeeToUpdate);

    }
    deleteEmployee(idToDelete: number){
        return this.employeeRepository.delete( idToDelete)

    }


}
