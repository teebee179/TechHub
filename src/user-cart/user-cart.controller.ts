import { Controller, Get, Render } from '@nestjs/common';
import { UserCartService } from './user-cart.service';

@Controller('/cart')
export class UserCartController {
  constructor(private readonly userCartService: UserCartService) {}
  @Get()
  @Render("./User/cart")
  root(){}
}
