import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentEntity } from "./TypeOrms/AppointmentEntity";
import { CustomerEntity } from "./TypeOrms/CustomerEntity";
import { EmployeeEntity } from "./TypeOrms/EmployeeEntity";
import { InventoryEntity } from "./TypeOrms/InventoryEntity";
import { ManagerEntity } from "./TypeOrms/ManagerEntity";
import { ReviewEntity } from "./TypeOrms/ReviewEntity";
import { SalonEntity } from "./TypeOrms/SalonEntity";
import { ServiceCategoryEntity } from "./TypeOrms/ServiceCategoryEntity";
import { ServiceEntity } from "./TypeOrms/ServiceEntity";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CustomerModule } from "./customer/customer.module";
import { EmployeeModule } from "./employee/employee.module";
import { InventoryModule } from "./inventory/inventory.module";
import { ManagerModule } from "./manager/manager.module";
import { SalonController } from "./salon/salon.controller";
import { SalonModule } from "./salon/salon.module";
import { SalonService } from "./salon/salon.service";
import { ServiceCategoryModule } from "./service-category/service-category.module";
import { ServiceController } from "./service/service.controller";
import { ServiceModule } from "./service/service.module";
import { ServiceService } from "./service/service.service";
import { AppointmentModule } from './appointment/appointment.module';
import { ReviewModule } from './review/review.module';
import { AuthenModule } from './authen/authen.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

import * as Joi from '@hapi/joi';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject:[ConfigService],
    useFactory: (configService: ConfigService) =>({
      type: 'mysql',
      host:'localhost',
      port: configService.get('MYSQL_PORT'),
      username: configService.get('MYSQL_USERNAME'),
      password: configService.get('MYSQL_PASSWORD'),
      database: configService.get('MYSQL_DATABASE'),
      entities:[
        ManagerEntity, 
        CustomerEntity, 
        EmployeeEntity, 
        ReviewEntity, 
        AppointmentEntity, 
        InventoryEntity, 
        SalonEntity, 
        ServiceEntity, 
        ServiceCategoryEntity
      ],
      synchronize: true
    })
    
  }),
    ConfigModule.forRoot({
      
      isGlobal: true,
      
    }), 
  EmployeeModule, CustomerModule, ManagerModule, InventoryModule, ServiceCategoryModule, ServiceModule, SalonModule, AppointmentModule, ReviewModule, AuthenModule, ConfigModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

