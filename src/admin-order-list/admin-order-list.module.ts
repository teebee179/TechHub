import { Module } from '@nestjs/common';
import { AdminOrderListService } from './admin-order-list.service';
import { AdminOrderListController } from './admin-order-list.controller';

@Module({
  controllers: [AdminOrderListController],
  providers: [AdminOrderListService]
})
export class AdminOrderListModule {}
