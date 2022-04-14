import { Module } from '@nestjs/common';
import { AdminHomeService } from './admin-home.service';
import { AdminHomeController } from './admin-home.controller';

@Module({
  controllers: [AdminHomeController],
  providers: [AdminHomeService]
})
export class AdminHomeModule {}
