import { Module } from '@nestjs/common';
import { UserHomeService } from './user-home.service';
import { UserHomeController } from './user-home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserHomeController],
  providers: [UserHomeService]
})
export class UserHomeModule {}
