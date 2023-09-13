"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AppointmentEntity_1 = require("./TypeOrms/AppointmentEntity");
const CustomerEntity_1 = require("./TypeOrms/CustomerEntity");
const EmployeeEntity_1 = require("./TypeOrms/EmployeeEntity");
const InventoryEntity_1 = require("./TypeOrms/InventoryEntity");
const ManagerEntity_1 = require("./TypeOrms/ManagerEntity");
const ReviewEntity_1 = require("./TypeOrms/ReviewEntity");
const SalonEntity_1 = require("./TypeOrms/SalonEntity");
const ServiceCategoryEntity_1 = require("./TypeOrms/ServiceCategoryEntity");
const ServiceEntity_1 = require("./TypeOrms/ServiceEntity");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const customer_module_1 = require("./customer/customer.module");
const employee_module_1 = require("./employee/employee.module");
const inventory_module_1 = require("./inventory/inventory.module");
const manager_module_1 = require("./manager/manager.module");
const salon_module_1 = require("./salon/salon.module");
const service_category_module_1 = require("./service-category/service-category.module");
const service_module_1 = require("./service/service.module");
const appointment_module_1 = require("./appointment/appointment.module");
const review_module_1 = require("./review/review.module");
const authen_module_1 = require("./authen/authen.module");
const config_1 = require("@nestjs/config");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: 'localhost',
                    port: configService.get('MYSQL_PORT'),
                    username: configService.get('MYSQL_USERNAME'),
                    password: configService.get('MYSQL_PASSWORD'),
                    database: configService.get('MYSQL_DATABASE'),
                    entities: [
                        ManagerEntity_1.ManagerEntity,
                        CustomerEntity_1.CustomerEntity,
                        EmployeeEntity_1.EmployeeEntity,
                        ReviewEntity_1.ReviewEntity,
                        AppointmentEntity_1.AppointmentEntity,
                        InventoryEntity_1.InventoryEntity,
                        SalonEntity_1.SalonEntity,
                        ServiceEntity_1.ServiceEntity,
                        ServiceCategoryEntity_1.ServiceCategoryEntity
                    ],
                    synchronize: true
                })
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            employee_module_1.EmployeeModule, customer_module_1.CustomerModule, manager_module_1.ManagerModule, inventory_module_1.InventoryModule, service_category_module_1.ServiceCategoryModule, service_module_1.ServiceModule, salon_module_1.SalonModule, appointment_module_1.AppointmentModule, review_module_1.ReviewModule, authen_module_1.AuthenModule, config_1.ConfigModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map