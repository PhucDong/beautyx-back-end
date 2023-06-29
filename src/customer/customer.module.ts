import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, SalonEntity])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
