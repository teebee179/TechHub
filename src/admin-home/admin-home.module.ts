import { Module } from '@nestjs/common';
import { AdminHomeService } from './admin-home.service';
import { AdminHomeController } from './admin-home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminHomeController],
  providers: [AdminHomeService]
})
export class AdminHomeModule {}
