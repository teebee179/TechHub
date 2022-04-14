import { Controller, Get, Post, Render, Redirect, Req, Body, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminLoginService } from './admin-login.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('admin')
export class AdminLoginController {
  constructor(
    private readonly adminLoginService: AdminLoginService
    ) {}
  @Get()
  @Render('./Admin/login')
  root(@Req() req){
    //console.log(req);
    
  }

  //@UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() body, @Res() res,  @Req() req){
    
    const result = await this.adminLoginService.validateUser(body.username, body.password)
  
    if (result){
      return res.redirect('/admin/home')
    }
    
    else {
      return res.redirect('/admin/')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  //@Get('/logout')
  
}
