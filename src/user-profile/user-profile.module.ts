import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { GoogleLoginService } from 'src/google-login/google-login.service';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}
