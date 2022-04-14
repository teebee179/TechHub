import { Module } from '@nestjs/common';
import { UserRegisterService } from './user-register.service';
import { UserRegisterController } from './user-register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserRegisterController],
  providers: [UserRegisterService]
})
export class UserRegisterModule {}
