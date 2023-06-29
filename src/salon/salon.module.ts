import { Module } from '@nestjs/common';
import { SalonController } from './salon.controller';
import { SalonService } from './salon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';

@Module({
  imports: [TypeOrmModule.forFeature([SalonEntity])],
  controllers: [SalonController],
  providers: [SalonService]
})
export class SalonModule {}
