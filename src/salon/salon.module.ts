import { Module } from '@nestjs/common';
import { SalonController } from './salon.controller';
import { SalonService } from './salon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';
import { ReviewEntity } from 'src/TypeOrms/ReviewEntity';

@Module({
  imports: [TypeOrmModule.forFeature([SalonEntity, ReviewEntity])],
  controllers: [SalonController],
  providers: [SalonService]
})
export class SalonModule {}
