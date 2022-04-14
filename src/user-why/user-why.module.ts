import { Module } from '@nestjs/common';
import { UserWhyService } from './user-why.service';
import { UserWhyController } from './user-why.controller';

@Module({
  controllers: [UserWhyController],
  providers: [UserWhyService]
})
export class UserWhyModule {}
