import { Controller, Get, Render, Request, Query, Redirect, UsePipes, ValidationPipe, Body, Post, Req, Param} from '@nestjs/common';
import { createProductDto } from 'src/DTO/createProduct.dto';
import { createTypeDto } from 'src/DTO/createType.dto';

import { Product } from 'src/Entities/Product';
import { UserProductService } from './user-product.service';

@Controller('/product')
export class UserProductController {
  constructor(private userService: UserProductService){

  }
  @Get('/:page')
  @Render('./User/product')
  async root(@Param() param){
    let page = param.page;
    if(!page || isNaN(page)) page = 1;
    else{
      page = parseInt(page);
    }
    
    const prods = await this.userService.get_All_Products((page-1)*9,9).then();
    const total  = await this.userService.getTotalProducts();
    const totalPages = Math.ceil(total/9);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    return {prods, totalPages, pages: Array.from(Array(totalPages).keys()).map(i=>i+1),nextPage, prevPage,};
  }

  @Get('?page')
  @Render('./User/product')
  async paginiation(@Query() query){
    let {page} = query.query;
    const prods = await this.userService.get_All_Products(0,9).then();
    return {prods};
  }
}
