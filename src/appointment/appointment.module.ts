import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, EmployeeEntity, CustomerEntity, SalonEntity, ServiceEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
