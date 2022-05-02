import { Controller, Get, Redirect, Render, Post, UseGuards, UseFilters } from '@nestjs/common';
import { Admin_AuthExceptionFilter } from 'src/Guards/admin-auth-exception.filter';
import { AuthenticatedGuard } from 'src/Guards/authenticated.guard';
import { AdminHomeService } from './admin-home.service';

@Controller('admin/home')
@UseFilters(Admin_AuthExceptionFilter)

export class AdminHomeController {
  constructor(private readonly adminHomeService: AdminHomeService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('./Admin/home')
  root(){
  }

  @Get('listProduct')
  async getListProducts(){
    const products = await this.adminHomeService.get_All_Products();
    return products;
  }

  @Get('/accounts')
  @Render('./Admin/accounts')
  account(){

  }

  @Get('/manages')
  @Render('./Admin/manage-users')
  manageAccount(){

  }

  @Get('/manages/user-detail')
  @Render('./Admin/user-detail')
  viewAccount(){

  }

  @Post()
  @Redirect('./Admin/home')
  @Render('./Admin/home')
  login() {

  }

  
}
