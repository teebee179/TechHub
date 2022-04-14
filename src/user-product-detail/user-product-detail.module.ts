import { Module } from '@nestjs/common';
import { UserProductDetailService } from './user-product-detail.service';
import { UserProductDetailController } from './user-product-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserProductDetailController],
  providers: [UserProductDetailService]
})
export class UserProductDetailModule {}
