import { Module } from '@nestjs/common';
import { ServiceCategoryEntity } from 'src/TypeOrms/ServiceCategoryEntity';
import { ServiceEntity } from 'src/TypeOrms/ServiceEntity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([ServiceEntity, ServiceCategoryEntity])],
    controllers: [ServiceController],
    providers: [ServiceService]
})

export class ServiceModule {
    
}
