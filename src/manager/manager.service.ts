import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerDto } from 'src/DTOs/AuthenDto';
import { createManagerDto } from 'src/DTOs/ManagerDto';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { comparePasswordAndHash, passwordToHash } from 'src/authen/bcrypt';
import { RoleEnum } from 'src/constants';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(ManagerEntity) private managerRepository: Repository<ManagerEntity>,
        @InjectRepository(SalonEntity) private salonRepository: Repository<SalonEntity>
        ) {}

    getManagers(){
        return this.managerRepository.find();
    }
    async getManager(idToFind: number){
        const manager = await this.managerRepository.findOneBy({id: idToFind})
        if (!manager) throw new HttpException('manager with the given id cannot be found', HttpStatus.NOT_FOUND)
        return manager
    }
    
    async createManager(salonId: number, newManager: createManagerDto){
        
        const salonToUpdate = await this.salonRepository.findOneBy({id: salonId})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)
        
        const managerToSave = this.managerRepository.create({...newManager});
        // console.log('this is the manager-------------created');
        // console.log(managerToSave)
        const savedManager = await this.managerRepository.save(managerToSave)
       
        salonToUpdate.manager = savedManager
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
        console.log('this is the updated salon with new manager')
        // console.log(updatedSalon)

        return savedManager
    }
    async registerManager(salonId: number, newManager: registerDto){
        
        const salonToUpdate = await this.salonRepository.findOneBy({id: salonId})
        if (!salonToUpdate) throw new HttpException('salon cannot be found to assign new manager', HttpStatus.NOT_FOUND)
        
        const managerToSave = this.managerRepository.create({...newManager, role: RoleEnum.Manager});
        // console.log('this is the manager-------------created');
        // console.log(managerToSave)
        const savedManager = await this.managerRepository.save(managerToSave)
       
        salonToUpdate.manager = savedManager
        const updatedSalon = await this.salonRepository.save(salonToUpdate)
        console.log('this is the updated salon with new manager')
        console.log(updatedSalon)

        return savedManager
    }
    updateManager(idToUpdate: number, updateDetails: createManagerDto){
        return this.managerRepository.update( idToUpdate, {...updateDetails})

    }
    deleteManager(idToDelete: number){
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
