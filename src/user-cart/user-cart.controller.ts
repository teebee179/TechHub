import { Controller, Get, Render, Request, UseGuards, UseFilters, Param, Res, Req } from '@nestjs/common';
import { createCartDto } from 'src/DTO/createCart.dto';
import { UserCartService } from './user-cart.service';

@Controller('/cart')

export class UserCartController {
  constructor(
    private readonly userCartService: UserCartService,
    ) {}

  @Get()
  @Render("./User/cart")
  async root(@Request() req){
    let items = ``
    if (req.session['passport']){
      const current_Cart = await this.userCartService.get_One_By_Id(req.user.user_id).then()
      if (current_Cart) {
        items = current_Cart.products
      }
    }
    
    return {user: req.user, cartItems: items}
  }

  @Get(':user_id')
  async api_insert_Into_Cart(@Param() pars, @Res() res, @Req() req) {
    if (req.session['passport']) {
      const text = pars.user_id;
      const params = text.split('*')
      const user_id = params[0];
      const products = params[1];
      const new_cart:createCartDto = {user_id, products}
      const cur = await this.userCartService.get_One_By_Id(user_id).then()
      console.log(cur);
      
      if (!cur) {
        await this.userCartService.create_Cart(new_cart)
      }
      else {
        await this.userCartService.update_Cart(new_cart, user_id);
      }
      const all = await this.userCartService.get_All_Cart().then();
      
    }
      
    else 
      console.log('chua dang nhap')
  }
}
