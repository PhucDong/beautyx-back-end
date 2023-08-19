import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createEmployeeDto, getEmployeesAvailableDto, updateEmployeeDto, updateEmployeeWorkDayDto, updateEmployeeWorkDayListDto } from 'src/DTOs/EmployeeDto';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ApprovalStatusEnum } from 'src/constants';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    
    getEmployees(){
        return this.employeeRepository.find({relations: ['appointments']});
    }
    async getEmployee(idToFind: number){
        const employee = await this.employeeRepository.findOneBy({id: idToFind});
        if (!employee) throw new HttpException('the employee with the given id cannot be found', HttpStatus.NOT_FOUND)
        const workDaysList = employee.workDays.split(',')
        var workDaysListToReturn = []
        for (var i = 0; i < workDaysList.length; i++) {
            var [dayStr, startTimeStr, endTimeStr] = workDaysList[i].split('-')
            workDaysListToReturn.push({
                workDay: dayStr,
                startTime: startTimeStr,
                endTime: endTimeStr
            })
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
        }
        return employeeToReturn
    }
    async getEmployeeAppointments(idToFind: number){
        const employee = await this.employeeRepository.findOne({relations: ['appointments'], where: {id: idToFind}});
        if (!employee) throw new HttpException('the employee with the given id cannot be found', HttpStatus.NOT_FOUND)
        return employee.appointments
     }
 
    async getEmployeesAvailable(getParams: getEmployeesAvailableDto){
        const salonId = getParams.salonId
        const appointmentTime = {
            appointmentDate: getParams.appointmentDate,
            startTime: getParams.startTime,
            estimatedEndTime: getParams.estimatedEndTime
        }
        const salonToFind = await this.salonRepository.findOne({where: {id: salonId}})
        if (!salonToFind) throw new HttpException('the salon with the given id cannot be found to get it\'s list of available employee', HttpStatus.NOT_FOUND)

        const employees = await this.employeeRepository.find({
            relations: ['salon', 'appointments'], 
            //where: {salon: salonToFind}
            where: { salon: {id: salonToFind.id} }
        })
        console.log('list of employees belonging to the salon')
        console.log(employees)
    
        if (employees.length == 0) {
            throw new HttpException('the salon has no employee assigned to it', HttpStatus.NO_CONTENT)
        }
        let availableEmployees: EmployeeEntity[] = [];
        
        for (var i = 0; i < employees.length; i++){
            const employeeBeingChecked = employees[i];
            console.log("checking an employee")
            var availability: Boolean = true;

            for (var j = 0; j < employeeBeingChecked.appointments.length; j++){
                console.log("checking an employee appointments")
                if(employeeBeingChecked.appointments[j].approvalStatus == ApprovalStatusEnum.APPROVED){
                    const dateToCheck = new Date(appointmentTime.appointmentDate)
                    const dateAssigned = employeeBeingChecked.appointments[j].appointmentDate

                    console.log('date of appointment assigned: ' + dateAssigned)
                    console.log('date of appointment to check: ' + dateToCheck)
                 
                    if(dateAssigned.getFullYear() != dateToCheck.getFullYear() 
                    || dateAssigned.getMonth() != dateToCheck.getMonth() 
                    || dateAssigned.getDate() != dateToCheck.getDate() 
                    ){
                        console.log('appointment not on the same date-------------------')
                        continue
                    } else {

                        console.log('time of appointment assigned: ' + employeeBeingChecked.appointments[j].startTime + ' to ' + employeeBeingChecked.appointments[j].estimatedEndTime)
                        console.log('time of appointment to check: ' + appointmentTime.startTime + ' to ' + appointmentTime.estimatedEndTime)

                        if ( (appointmentTime.startTime >= employeeBeingChecked.appointments[j].startTime && appointmentTime.startTime <= employeeBeingChecked.appointments[j].estimatedEndTime)
                            || (appointmentTime.estimatedEndTime >= employeeBeingChecked.appointments[j].startTime && appointmentTime.estimatedEndTime <= employeeBeingChecked.appointments[j].estimatedEndTime) 
                            || (appointmentTime.startTime <= employeeBeingChecked.appointments[j].startTime && appointmentTime.estimatedEndTime >= employeeBeingChecked.appointments[j].estimatedEndTime)) {
                                console.log("overlapping appointment found---------------------")
                                availability = false;
                                break;
                            }
                    }
                }

            }
            if (availability == true){
                console.log('current employee added to available list')
                availableEmployees.push(employeeBeingChecked)
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

        var workDays = ''
        for (var i = 0; i < newEmployee.workDays.length; i++){
            const currentWorkDay = newEmployee.workDays[i]
            workDays += currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime + ','
        }

        if (workDays.charAt(workDays.length - 1) == ','){
            workDays = workDays.substring(0, workDays.length - 1)
        }
        const employeeToSave = this.employeeRepository.create({...newEmployee, workDays});
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
        if (!employeeToUpdate) throw new HttpException('the employee with the given id cannot be found to update the workday', HttpStatus.NOT_FOUND)

        // var [day, startTime, endTime] = updateDetails.workDay.split('-')
        // var timeFormat: RegExp = /^([0-1]?[0-9]|2?[0-4]):([0-5]?[0-9]):([0-5]?[0-9])$/;

        // if (timeFormat.test(startTime) == false) throw new HttpException("the start time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        // if (timeFormat.test(endTime) == false) throw new HttpException("the end time format is incorrect, please enter the time by this format: hh:mm:ss", HttpStatus.BAD_REQUEST)
        
        const employeeUpdated = this.updateWorkDay(employeeToUpdate, updateDetails)

        return this.employeeRepository.save(employeeToUpdate);

    }
    async updateEmployeeWorkDayList(idToUpdate: number, updateDetails: updateEmployeeWorkDayListDto){
        const employeeToUpdate = await this.employeeRepository.findOne({where: {id: idToUpdate}})
        if (!employeeToUpdate) throw new HttpException('the employee with the given id cannot be found to update the workday', HttpStatus.NOT_FOUND)
        let employeeUpdated: EmployeeEntity
        for (var i = 0; i < updateDetails.workDayList.length; i++){
            const currentWorkDay = updateDetails.workDayList[i]
            employeeUpdated = this.updateWorkDay(employeeToUpdate, currentWorkDay)
        }
        
        return this.employeeRepository.save(employeeUpdated);

    }
    
    deleteEmployee(idToDelete: number){
        return this.employeeRepository.delete( idToDelete)

    }
    
    updateWorkDay(employeeToUpdate: EmployeeEntity, currentWorkDay){
        const workDayStr = currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime
        const indexToFind = employeeToUpdate.workDays.indexOf(currentWorkDay.workDay)

        if (indexToFind == -1){
            if (employeeToUpdate.workDays == ''){
                employeeToUpdate.workDays = workDayStr
            } else {
                employeeToUpdate.workDays = employeeToUpdate.workDays + ',' + workDayStr
            }
        } else {
            const leftString = employeeToUpdate.workDays.substring(0, indexToFind);
            const rightString = employeeToUpdate.workDays.substring(indexToFind + workDayStr.length + 1);
            employeeToUpdate.workDays = leftString + ',' + rightString
            if (employeeToUpdate.workDays.charAt(employeeToUpdate.workDays.length - 1) == ','){
                employeeToUpdate.workDays = employeeToUpdate.workDays.substring(0, employeeToUpdate.workDays.length - 1)
            }

        }
        return employeeToUpdate
    }

}
