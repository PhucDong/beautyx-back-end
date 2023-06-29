import { Module } from '@nestjs/common';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from './service-category.service';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategoryEntity, SalonEntity])],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService]
})
export class ServiceCategoryModule {}
