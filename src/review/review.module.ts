import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { AppointmentEntity } from 'src/TypeOrms/AppointmentEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, CustomerEntity, AppointmentEntity])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
