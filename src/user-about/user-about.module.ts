import { Module } from '@nestjs/common';
import { UserAboutService } from './user-about.service';
import { UserAboutController } from './user-about.controller';

@Module({
  controllers: [UserAboutController],
  providers: [UserAboutService]
})
export class UserAboutModule {}
