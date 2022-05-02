import { LoginGuard } from './../Guards/login.guard';
import { Body, Controller, Get, Post, Render, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { Admin_AuthExceptionFilter } from 'src/Guards/admin-auth-exception.filter';
import { createAccountDto } from 'src/DTO/createAccount.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('/admin' || '/admin/login')
@UseFilters(Admin_AuthExceptionFilter)

export class AdminLoginController {
  constructor(
    private readonly adminLoginService: AdminLoginService,
    private jwtService: JwtService,

    ) {}


  @Get()
  @Render('./admin/login')
  root(){
    console.log('abc');
  }

  @Post()
  //@UseGuards(AdminLoginGuard)
  @Render("./admin/home")
  async login(@Body() user:createAccountDto, @Req() req) {
    const foundUser = await this.adminLoginService.validUser(user.user_Name, user.password);
    console.log(foundUser)
    if (!foundUser) return { url: '/login' };
    const payload = {name: foundUser.user_Name, sub:foundUser.id};
    const accessToken = this.jwtService.sign(payload);
    req.user = foundUser;
    return {user: foundUser};
  }
}
