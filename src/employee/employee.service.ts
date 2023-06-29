import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createEmployeeDto, updateEmployeeDto } from 'src/DTOs/EmployeeDto';
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
        return  this.employeeRepository.update( idToUpdate, {...updateDetails});

    }
    
    deleteEmployee(idToDelete: number){
        return this.employeeRepository.delete( idToDelete)

    }


}
