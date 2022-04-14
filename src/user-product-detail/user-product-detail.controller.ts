import { Controller, Get, Render, Param, Query } from '@nestjs/common';
import { UserProductDetailService } from './user-product-detail.service';

@Controller('/product/detail')
export class UserProductDetailController {
  constructor(private readonly userProductDetailService: UserProductDetailService) {}
  @Get('/:id')
  @Render("./User/productDetail")
  async root(@Param() params){
    const prods = await this.userProductDetailService.get_One_Product_By_Id(params.id);
    console.log(params.id);
    console.log(prods);
    return {prods};
  }
}
