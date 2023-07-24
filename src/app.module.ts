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
import { GatewayModule } from "./gateway/gateway.module";
import { SocketModule } from "./socket/socket.module";





@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'NestjsUser',
    password: 'Triet@23221097@',
    database: 'beautyx',
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
  }), EmployeeModule, CustomerModule, ManagerModule, InventoryModule, ServiceCategoryModule, ServiceModule, SalonModule, AppointmentModule, ReviewModule, GatewayModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

