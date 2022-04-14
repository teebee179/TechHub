import { Module } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { UserTestController } from './user-test.controller';

@Module({
  controllers: [UserTestController],
  providers: [UserTestService]
})
export class UserTestModule {}
