import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { Admin_AuthExceptionFilter } from 'src/Guards/admin-auth-exception.filter';
import { AuthenticatedGuard } from 'src/Guards/authenticated.guard';
import { AdminOrderListService } from './admin-order-list.service';

@Controller('admin/order')
// @UseFilters(Admin_AuthExceptionFilter)
// @UseGuards(AuthenticatedGuard)

export class AdminOrderListController {
  constructor(private readonly adminOrderListService: AdminOrderListService) {}

  @Get()
  @Render('./Admin/order-list.hbs')
  root(){
    
  }
}
