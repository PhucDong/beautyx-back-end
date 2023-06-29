import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from 'src/TypeOrms/EmployeeEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeEntity, AppointmentEntity, SalonEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
