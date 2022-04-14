import { Controller, Get, Render } from '@nestjs/common';
import { UserAboutService } from './user-about.service';

@Controller('/about')
export class UserAboutController {
  constructor(private readonly userAboutService: UserAboutService) {}
  @Get()
  @Render("./User/about")
  root(){}
}
