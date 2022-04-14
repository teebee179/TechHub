import { Controller, Get, Render,Request, Post, Redirect, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './Entities/Product';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('./User/home')
  root(@Res() res){
    const user = res.locals.user;
    return { user:user };
  }
  @Get('/logout')
  @Redirect('/')
  logout(@Res({passthrough:true}) res: Response){
    res.clearCookie('jwt');
    res.locals.user = null;
  }
}

