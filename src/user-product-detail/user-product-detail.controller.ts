import { Controller, Get, Render, Param, Query, Request } from '@nestjs/common';
import { UserProductDetailService } from './user-product-detail.service';

@Controller('/product/detail')
export class UserProductDetailController {
  constructor(private readonly userProductDetailService: UserProductDetailService) {}
  @Get('/:id')
  @Render("./User/productDetail")
  async root(@Param() params, @Request() req){
    const prods = await this.userProductDetailService.get_One_Product_By_Id(params.id);
    const total = await this.userProductDetailService.get_Total_Products_By_Type(prods.brand);
    const relatedProducts = await this.userProductDetailService.get_Products_By_Type(prods.brand);
    const totalPages = Math.ceil(total/4);
    console.log(params.id);
    console.log(totalPages);
    return {prods, relatedProducts, pages: Array.from(Array(totalPages).keys()).map(i=>i+1), user: req.user};
  }
}
