import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminProductController],
  providers: [AdminProductService]
})
export class AdminProductModule {}
