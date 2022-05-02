import { Module } from '@nestjs/common';
import { AdminUserDetailService } from './admin-user-detail.service';
import { AdminUserDetailController } from './admin-user-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminUserDetailController],
  providers: [AdminUserDetailService]
})
export class AdminUserDetailModule {}