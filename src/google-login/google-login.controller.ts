import { Controller, Get, Req, UseGuards, Render, Redirect, Request,Res } from '@nestjs/common';
import { GoogleLoginService } from './google-login.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleLoginController {
  constructor(private readonly googleLoginService: GoogleLoginService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async signInWithGoogle(@Req() req) {
    console.log(req.user)
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async signInWithGoogleRedirect(@Req() req, @Res() res) {
    
    const user = this.googleLoginService.signInWithGoogle(req).then(token => { return token});
    user.then(function(result){
      console.log(result);
      if(result){
        return res.redirect('/home'), user;
      }
      else{
        res.redirect('/login');
      }
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async userProfile(@Req() req, @Res() res) {
    return req.user;
  }
}
