import { Controller, Get, Render, Request, Post, UseGuards, Body, Redirect, Res, Req } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/DTO/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('/login')
export class UserLoginController {
  constructor(
    private readonly userLoginService: UserLoginService,
    private jwtService: JwtService) {}

  @Get()
  @Render('./User/login')
  root(@Req() req){
    if(req.user){
      return {url: '/'};
    }
  }

  @Post()
  @UseGuards(AuthGuard('local'))
  @Redirect('./')
  async login(@Body() user, @Req() req) {
    const foundUser = await this.userLoginService.verifyUser(user.username, user.password);
    if (!foundUser) return { url: '/login' };
    const payload = {name: foundUser.user_username, sub:foundUser.user_id};
    const accessToken = this.jwtService.sign(payload);
    req.user = foundUser;
    return { accessToken };
  }
}
