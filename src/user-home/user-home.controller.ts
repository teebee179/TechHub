import { Controller, Get, Render } from '@nestjs/common';
import { UserHomeService } from './user-home.service';

@Controller('/home')
export class UserHomeController {
  constructor(private readonly userHomeService: UserHomeService) {}
  @Get()
  @Render("./User/home")
  root(){}
}


