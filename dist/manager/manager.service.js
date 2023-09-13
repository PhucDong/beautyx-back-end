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
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AppointmentEntity_1 = require("../TypeOrms/AppointmentEntity");
const ManagerEntity_1 = require("../TypeOrms/ManagerEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const bcrypt_1 = require("../authen/bcrypt");
const constants_1 = require("../constants");
const salon_service_1 = require("../salon/salon.service");
const typeorm_2 = require("typeorm");
let ManagerService = exports.ManagerService = class ManagerService {
    constructor(managerRepository, salonRepository, appointmentRepository, salonService) {
        this.managerRepository = managerRepository;
        this.salonRepository = salonRepository;
        this.appointmentRepository = appointmentRepository;
        this.salonService = salonService;
    }
    getManagers() {
        return this.managerRepository.find();
    }
    async getManager(idToFind) {
        const manager = await this.managerRepository.findOne({ relations: ['salon'], where: { id: idToFind } });
        if (!manager)
            throw new common_1.HttpException('manager with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return manager;
    }
    async getManagerDashboard(idToFind) {
        const manager = await this.getManager(idToFind);
        const salon = await this.salonService.getSalon(manager.salon.id);
        const appointment = await this.salonService.getSalonAppointments(salon.id);
        let appointmentIdList = [];
        for (var i = 0; i < salon.appointments.length; i++) {
            appointmentIdList.push(salon.appointments[i].id);
        }
        console.log('list of appointment id: --------------');
        console.log(appointmentIdList);
        const appointments = await this.appointmentRepository.find({ relations: ['employee', 'customer'], where: { id: (0, typeorm_2.In)(appointmentIdList) } });
        console.log("appointments found in repository: " + appointments[0]);
        salon.appointments = appointments;
        return salon;
    }
    async createManager(newManager) {
        const managerToSave = this.managerRepository.create(Object.assign({}, newManager));
        const savedManager = await this.managerRepository.save(managerToSave);
        return savedManager;
    }
    async registerManager(newManager) {
        const managerToSave = this.managerRepository.create(Object.assign(Object.assign({}, newManager), { role: constants_1.RoleEnum.Manager }));
        const savedManager = await this.managerRepository.save(managerToSave);
        return savedManager;
    }
    async assignManagerToSalon(managerId, salonId) {
        const salonToUpdate = await this.salonRepository.findOne({ relations: ['manager'], where: { id: salonId } });
        if (!salonToUpdate)
            throw new common_1.HttpException('salon cannot be found to assign new manager', common_1.HttpStatus.NOT_FOUND);
        const managerToUpdate = await this.managerRepository.findOne({ relations: ['salon'], where: { id: managerId } });
        if (!managerToUpdate)
            throw new common_1.HttpException('manager cannot be found to assign to salon', common_1.HttpStatus.NOT_FOUND);
        if (salonToUpdate.manager != null) {
            throw new common_1.HttpException("the salon already has a manager assigned to it, remove current manager before assigning new manager", common_1.HttpStatus.BAD_REQUEST);
        }
        console.log("manager begin assigned: " + managerToUpdate.id);
        console.log("salon being assigned new manager: " + salonToUpdate.id);
        const updatedManager = await this.managerRepository.update(managerId, { salon: salonToUpdate });
        console.log("returning");
        return updatedManager;
    }
    async removeManagerFromSalon(managerId, salonId) {
        const salonToUpdate = await this.salonRepository.findOne({ relations: ['manager'], where: { id: salonId } });
        if (!salonToUpdate)
            throw new common_1.HttpException('salon cannot be found to assign new manager', common_1.HttpStatus.NOT_FOUND);
        const managerToUpdate = await this.managerRepository.findOne({ relations: ['salon'], where: { id: managerId } });
        if (!managerToUpdate)
            throw new common_1.HttpException('manager cannot be found to assign to salon', common_1.HttpStatus.NOT_FOUND);
        const updatedManager = await this.managerRepository.update(managerId, { salon: null });
        return updatedManager;
    }
    updateManager(idToUpdate, updateDetails) {
        return this.managerRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    deleteManager(idToDelete) {
        console.log("deleting manager");
        return this.managerRepository.delete(idToDelete);
    }
    async getManagerByEmail(emailToFind) {
        const manager = await this.managerRepository.findOneBy({ email: emailToFind });
        console.log("getting manager by email: " + manager);
        return manager;
    }
    async setCurrentRefreshToken(refreshTokenToUpdate, userId) {
        console.log("updating refresh token");
        console.log("manager id when saving refresh token is: " + userId);
        const refreshToken = (0, bcrypt_1.passwordToHash)(refreshTokenToUpdate);
        console.log('hashed refresh token: ' + refreshToken);
        return this.managerRepository.update(userId, { refreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        console.log("checking if refresh token matches in customer service");
        console.log("customer id when comparing refresh token is: " + userId);
        const manager = await this.getManager(userId);
        const isRefreshTokenMatching = (0, bcrypt_1.comparePasswordAndHash)(refreshToken, manager.refreshToken);
        if (isRefreshTokenMatching) {
            console.log("refresh token is identical, authorize new access token");
            return manager;
        }
        else {
            throw new common_1.HttpException("the refresh token does not match", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async removeRefreshToken(userId) {
        return this.managerRepository.update(userId, {
            refreshToken: null
        });
    }
};
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ManagerEntity_1.ManagerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(AppointmentEntity_1.AppointmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        salon_service_1.SalonService])
], ManagerService);
//# sourceMappingURL=manager.service.js.map