import { Module } from '@nestjs/common';
import { UserProductService } from './user-product.service';
import { UserProductController } from './user-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserProductController],
  providers: [UserProductService]
})
export class UserProductModule {}
