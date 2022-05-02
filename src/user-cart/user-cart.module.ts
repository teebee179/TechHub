import { Module } from '@nestjs/common';
import { UserCartService } from './user-cart.service';
import { UserCartController } from './user-cart.controller';
import entities from 'src/Entities/All_Entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserCartController],
  providers: [UserCartService]
})
export class UserCartModule {}
