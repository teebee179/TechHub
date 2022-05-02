import { Controller, Get, Render, Request } from '@nestjs/common';
import { UserAboutService } from './user-about.service';

@Controller('/about')
export class UserAboutController {
  constructor(private readonly userAboutService: UserAboutService) {}
  @Get()
  @Render("./User/about")
  root(@Request() req){
    return {user: req.user}
  }
}
