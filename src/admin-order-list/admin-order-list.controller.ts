import { Controller, Get, Render } from '@nestjs/common';
import { AdminOrderListService } from './admin-order-list.service';

@Controller('admin/order')
export class AdminOrderListController {
  constructor(private readonly adminOrderListService: AdminOrderListService) {}

  @Get()
  @Render('./Admin/order-list.hbs')
  root(){
    
  }
}
