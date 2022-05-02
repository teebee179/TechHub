import { Controller, Get, Render, Request, Query, Redirect, UsePipes, ValidationPipe, Body, Post, Req, Param, Res, UseFilters, UseGuards} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { createProductDto } from 'src/DTO/createProduct.dto';
import { createTypeDto } from 'src/DTO/createType.dto';

import { Product } from 'src/Entities/Product';
import { Admin_AuthExceptionFilter } from 'src/Guards/admin-auth-exception.filter';
import { AuthenticatedGuard } from 'src/Guards/authenticated.guard';
import { AdminProductService } from './admin-product.service';


@Controller('admin/products')
// @UseFilters(Admin_AuthExceptionFilter)
// @UseGuards(AuthenticatedGuard)

export class AdminProductController {

  constructor(private readonly adminProductService: AdminProductService) {}

  @Get()
  @Render('./Admin/products')
  async root( @Query() query){
    const page = 1;
    const prods = await this.adminProductService.get_All_Products_By_Page((page-1)*5,5).then();
    const categories = await this.adminProductService.get_All_Type().then(); 
    const total  = await this.adminProductService.getTotalProducts();
    const totalPages = Math.ceil(total/5);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    return {types: categories, products: prods, totalPages, pages: Array.from(Array(totalPages).keys()).map(i=>i+1),nextPage, prevPage,};
  }

  @Get('page/:page')
  async adminProductPaging(@Param('page') page, @Res() res){
    const categories = await this.adminProductService.get_All_Type().then(); 
    if(!page || isNaN(page)) page = 1;
    else{
      page = parseInt(page);
    }
    const products = await this.adminProductService.get_All_Products_By_Page((page-1)*5,5).then();
    const total  = await this.adminProductService.getTotalProducts();
    const totalPages = Math.ceil(total/5);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    return res.json(products);
  }

  @Post()
  @Redirect('/admin/products')
  async DeleteProduct(@Body() body){
    const pid:number = body.prod_id;
    
    if (pid !== undefined) {
      await this.adminProductService.delete_Product(pid);
    }

    const prods = await this.adminProductService.get_All_Products().then();
    const categories = await this.adminProductService.get_All_Type().then();    
    return {products: prods, types: categories};
  }

  @Get('/add')
  @Render('./Admin/add-product')
  @UsePipes(ValidationPipe)
  async render_Add_Page(){
    const categories = await this.adminProductService.get_All_Type().then();
    return {types: categories};
  }

  @Post('add')
  @Render('./Admin/add-product')
  @Redirect('/admin/products/')
  @UsePipes(ValidationPipe)
  async add_NewProduct(@Body() query){
    const categories = await this.adminProductService.get_All_Type().then();
    const new_Product:createProductDto = (query)
    // console.log(query);
    
    if (new_Product.product_name) {
      this.adminProductService.create_Product(new_Product);
      const prods = await this.adminProductService.get_All_Products().then();
      return {products: prods, types: categories};
    }
      return {types: categories};
  }

  // @Get('add/new-product')
  // @Render('./Admin/products')
  // @Redirect('/admin/products')
  // @UsePipes(ValidationPipe)
  // async post_newProduct(@Query() new_Product: createProductDto){
  //   this.adminProductService.create_Product(new_Product);
  //   const categories = await this.adminProductService.get_All_Type().then();
  //   const prods = await this.adminProductService.get_All_Products().then();
  //   return { products: prods, types: categories };
  // }

  @Get('edit/:id')
  @Render('./Admin/edit-product')
  @UsePipes(ValidationPipe)
  async get_Product_Info(@Param('id') id){
    const categories = await this.adminProductService.get_All_Type().then();
    const product = await this.adminProductService.get_One_Product_By_Id(id).then();
    return {prod: product, types: categories};
  }

  @Post('edit')
  @Redirect('/admin/products')
  @UsePipes(ValidationPipe)
  async postUpdatedProduct(@Body() body) {
    const productDto: createProductDto = body;
    await this.adminProductService.update_Product(productDto, body.id);
  }

  // @Get('edit/api/is-empty/:data')
  // async checkEmptyInput(@Param('data') data): Promise<boolean> {
  //   return await !isEmpty(data);
  // @Render('./Admin/edit-product')
  // @Redirect('/admin/products')
  // @UsePipes(ValidationPipe)
  // async postUpdatedProduct(@Body() body){
  //   const categories = await this.adminProductService.get_All_Type().then();
  //   const productDto:createProductDto = body;
  //   const updated_Prod = await this.adminProductService.update_Product(productDto, body.id).then();
    
  //   return {prod: updated_Prod, types: categories};
  // }

  @Get('/category')
  @Render('./Admin/products')
  @Redirect('/admin/products')
  @Render('/admin/products')
  @UsePipes(ValidationPipe)
  async addCategory(@Query() new_Type:createTypeDto){
    const categories = await this.adminProductService.get_All_Type().then();
    //paging
    const page = 1;
    const prods = await this.adminProductService.get_All_Products_By_Page((page-1)*5,5).then();
    const total  = await this.adminProductService.getTotalProducts();
    const totalPages = Math.ceil(total/5);
    let nextPage = page + 1;
    if(nextPage > totalPages){
      nextPage = totalPages;
    }
    let prevPage = page - 1;
    if(prevPage < 1){
      prevPage = 1;
    }
    if (new_Type.type_name){
      await this.adminProductService.create_Type(new_Type);
      const categories = await this.adminProductService.get_All_Type().then();
      return {products: prods, types: categories, totalPages, pages: Array.from(Array(totalPages).keys()).map(i=>i+1),nextPage, prevPage,};
    }

    return {products: prods, types: categories, totalPages, pages: Array.from(Array(totalPages).keys()).map(i=>i+1),nextPage, prevPage,};

  }

  @Get('/category/:type_name')
  @Render('./Admin/products')
  @Redirect('/admin/products')
  async DeleteType(@Param() param){
    const type_name = param.type_name;
    if (type_name !== undefined) {
      await this.adminProductService.delete_Type(type_name);

    }
    const prods = await this.adminProductService.get_All_Products().then();
    const categories = await this.adminProductService.get_All_Type().then();
    return {products: prods, types: categories};
  }
}
