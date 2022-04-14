import { Controller, Get, Render } from '@nestjs/common';
import { UserTestService } from './user-test.service';

@Controller('/testimonial')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}
  @Get()
  @Render("./User/testimonial")
  root(){}
}
