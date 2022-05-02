import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { GoogleLoginService } from 'src/google-login/google-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';
@Module({
  imports: [ TypeOrmModule.forFeature(entities),],
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}
