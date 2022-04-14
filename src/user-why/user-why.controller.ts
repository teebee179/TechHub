import { Controller, Get, Render } from '@nestjs/common';
import { UserWhyService } from './user-why.service';

@Controller('/why')
export class UserWhyController {
  constructor(private readonly userWhyService: UserWhyService) {}
  @Get()
  @Render("./User/why")
  root(){}
}
