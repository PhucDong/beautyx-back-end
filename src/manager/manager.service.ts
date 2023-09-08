import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerDto } from 'src/DTOs/AuthenDto';
import { createManagerDto } from 'src/DTOs/ManagerDto';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { comparePasswordAndHash, passwordToHash } from 'src/authen/bcrypt';
import { RoleEnum } from 'src/constants';
import { SalonService } from 'src/salon/salon.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(ManagerEntity) private managerRepository: Repository<ManagerEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>,
        @InjectRepository(AppointmentEntity) private appointmentRepository: Repository<AppointmentEntity>,
        private readonly salonService: SalonService
        ) {}

    getManagers(){
        return this.managerRepository.find();
    }
    async getManager(idToFind: number){
        const manager = await this.managerRepository.findOne({relations: ['salon'], where: {id: idToFind}});
        if (!manager) throw new HttpException('manager with the given id cannot be found', HttpStatus.NOT_FOUND)
        return manager
    }
    async getManagerDashboard(idToFind: number){
        const manager = await this.getManager(idToFind)
        const salon = await this.salonService.getSalon(manager.salon.id)
        const appointment = await this.salonService.getSalonAppointments(salon.id)
        let appointmentIdList: number[] = []
        //console.log("the salons appointments: " + salon.appointments)
        //console.log('the length of the salons appointments: ' + salon.appointments.length)
        for ( var i = 0; i < salon.appointments.length; i++) {
            appointmentIdList.push(salon.appointments[i].id)
        }
        
        console.log('list of appointment id: --------------');
        console.log(appointmentIdList)

        const appointments = await this.appointmentRepository.find({ relations: ['employee', 'customer'], where:{ id: In(appointmentIdList) } })
        console.log("appointments found in repository: " + appointments[0])
        salon.appointments = appointments

        return salon

    }
    async createManager(newManager: createManagerDto){
        
        const managerToSave = this.managerRepository.create({...newManager});
        // console.log('this is the manager-------------created');
        // console.log(managerToSave)
        const savedManager = await this.managerRepository.save(managerToSave)

        return savedManager
    }
    async registerManager(newManager: registerDto){
        const managerToSave = this.managerRepository.create({...newManager, role: RoleEnum.Manager});
        const savedManager = await this.managerRepository.save(managerToSave)
        return savedManager
    }
    async assignManagerToSalon(managerId: number, salonId: number){

        const salonToUpdate = await this.salonRepository.findOne({relations: ['manager'], where: {id: salonId}})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)
        const managerToUpdate = await this.managerRepository.findOne({relations: ['salon'], where: {id: managerId}})
        if (!managerToUpdate) throw new HttpException('manager cannot be found to assign to salon', HttpStatus.NOT_FOUND)
        if (salonToUpdate.manager != null) {
            throw new HttpException("the salon already has a manager assigned to it, remove current manager before assigning new manager", HttpStatus.BAD_REQUEST)
        }
        console.log("manager begin assigned: " + managerToUpdate.id)
        console.log("salon being assigned new manager: " + salonToUpdate.id)
        // salonToUpdate.manager = managerToUpdate
        // managerToUpdate.salon = salonToUpdate
        // await this.salonRepository.save(salonToUpdate)
        
        // const updatedSalon = await this.salonRepository.update(salonId, {manager: managerToUpdate})
        const updatedManager = await this.managerRepository.update(managerId, {salon: salonToUpdate})
        console.log("returning")
        return updatedManager
        // return this.managerRepository.save(managerToUpdate)
        
    }
    async removeManagerFromSalon(managerId: number, salonId: number){
        const salonToUpdate = await this.salonRepository.findOne({relations: ['manager'], where: {id: salonId}})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)
        const managerToUpdate = await this.managerRepository.findOne({relations: ['salon'], where: {id: managerId}})
        if (!managerToUpdate) throw new HttpException('manager cannot be found to assign to salon', HttpStatus.NOT_FOUND)

        // salonToUpdate.manager = null
        // managerToUpdate.salon = null
        const updatedManager = await this.managerRepository.update(managerId, {salon: null})
        // await this.salonRepository.save(salonToUpdate)
        // return this.managerRepository.save(managerToUpdate)
        return updatedManager
    }
    updateManager(idToUpdate: number, updateDetails: createManagerDto){
        return this.managerRepository.update( idToUpdate, {...updateDetails})

    }
    deleteManager(idToDelete: number){
        console.log("deleting manager")
        return this.managerRepository.delete( idToDelete)

    }
    async getManagerByEmail(emailToFind: string){
        const manager = await this.managerRepository.findOneBy({email: emailToFind})
        //if (!manager) throw new HttpException('manager with the given email cannot be found', HttpStatus.NOT_FOUND)
        console.log("getting manager by email: " + manager)
        return manager
    }
    async setCurrentRefreshToken(refreshTokenToUpdate: string, userId: number) {
        console.log("updating refresh token")
        console.log("manager id when saving refresh token is: " + userId)
        //const refreshToken = await bcrypt.hash(refreshTokenToUpdate, 10);
        const refreshToken = passwordToHash(refreshTokenToUpdate)

        console.log('hashed refresh token: ' + refreshToken)
        // const customer = await this.getCustomer(userId)
        // customer.refreshToken = refreshToken
        // return this.customerRepository.save(customer)
        return this.managerRepository.update(userId, { refreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        console.log("checking if refresh token matches in customer service")
        console.log("customer id when comparing refresh token is: " + userId)
        const manager = await this.getManager(userId)
        // const isRefreshTokenMatching = await bcrypt.compare( refreshToken, customer.refreshToken );
        const isRefreshTokenMatching = comparePasswordAndHash(refreshToken, manager.refreshToken)
        if (isRefreshTokenMatching) {
            console.log("refresh token is identical, authorize new access token")
          return manager;
        } else {
            throw new HttpException("the refresh token does not match", HttpStatus.UNAUTHORIZED)
        }

    }
    async removeRefreshToken(userId: number) {
        return this.managerRepository.update(userId, {
          refreshToken: null
        });
    }

}
