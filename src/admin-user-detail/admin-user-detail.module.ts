import { Module } from '@nestjs/common';
import { AdminUserDetailService } from './admin-user-detail.service';
import { AdminUserDetailController } from './admin-user-detail.controller';

@Module({
  controllers: [AdminUserDetailController],
  providers: [AdminUserDetailService]
})
export class AdminUserDetailModule {}