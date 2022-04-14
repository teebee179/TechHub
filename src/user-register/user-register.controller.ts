import { Controller, Get, Render, Post, Req, Res, Body, Redirect } from '@nestjs/common';
import { createUserDto } from 'src/DTO/createUser.dto';
import { User } from 'src/Entities/User';
import { UserRegisterService } from './user-register.service';

@Controller('/register')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}
  @Get()
  @Render('./User/register')
  root(){}

  @Post()
  @Redirect('./login')
  async createUser(@Body() body: createUserDto){
    this.userRegisterService.registerUser(body);
  }
}
