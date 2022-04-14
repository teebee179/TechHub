import { Controller, Get, Req, UseGuards, Render } from '@nestjs/common';
import { GoogleLoginService } from './google-login.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleLoginController {
  constructor(private readonly googleLoginService: GoogleLoginService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async signInWithGoogle(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async signInWithGoogleRedirect(@Req() req) {
    return this.googleLoginService.signInWithGoogle(req);
  }
}
