import { Controller, Get,UseGuards, Req, Render } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleLoginService } from 'src/google-login/google-login.service';

@Controller('/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Get()
  @Render("./User/userProfile")
  root(){}
}
