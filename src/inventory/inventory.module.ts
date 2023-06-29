import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from 'src/TypeOrms/InventoryEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from 'src/TypeOrms/SalonEntity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity, SalonEntity])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
