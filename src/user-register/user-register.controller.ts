import { Controller, Get, Render, Post, Req, Res, Body, Redirect, Param } from '@nestjs/common';
import { createUserDto } from 'src/DTO/createUser.dto';
import { User } from 'src/Entities/User';
import { UserRegisterService } from './user-register.service';

@Controller('/register')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}
  @Get()
  @Render('./User/register')
  root(){
  }

  @Get(':user_username')
  async api_Check_Exists_Username(@Param('user_username') username, @Res() res){
    const exists = await this.userRegisterService.is_Exists(username);    
    return res.json(!!exists);
    
  }

  @Post()
  @Redirect('./login')
  async createUser(@Body() body: createUserDto){
    this.userRegisterService.registerUser(body);
  }
}
