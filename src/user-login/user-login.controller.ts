import { Controller, Get, Render, Request, Post, UseGuards, Body, Redirect, Res, Req, UseFilters} from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from '../Guards/login.guard';
import { AuthExceptionFilter } from '../Guards/auth-exception.filter';

@Controller('/login')
@UseFilters(AuthExceptionFilter)
export class UserLoginController {
  constructor(
    private readonly userLoginService: UserLoginService,
    private jwtService: JwtService) {}

  @Get()
  @Render('./User/login')
  root(@Req() req, @Res() res: Response){
    return;
  }

  @Post()
  @UseGuards(LoginGuard)
  @Render("./User/home")
  async login(@Body() user, @Req() req) {
    const products = await this.userLoginService.get_All_Products(0,9).then();
    const foundUser = await this.userLoginService.verifyUser(user.username, user.password);
    if (!foundUser) return { url: '/login' };
    const payload = {name: foundUser.user_username, sub:foundUser.user_id};
    const accessToken = this.jwtService.sign(payload);
    req.user = foundUser;
    return {products, user: foundUser};
  }

}
