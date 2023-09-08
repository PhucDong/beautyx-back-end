import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { SalonModule } from 'src/salon/salon.module';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity, SalonEntity, AppointmentEntity]),
    SalonModule
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}
