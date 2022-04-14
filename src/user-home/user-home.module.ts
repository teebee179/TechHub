import { Module } from '@nestjs/common';
import { UserHomeService } from './user-home.service';
import { UserHomeController } from './user-home.controller';

@Module({
  controllers: [UserHomeController],
  providers: [UserHomeService]
})
export class UserHomeModule {}
