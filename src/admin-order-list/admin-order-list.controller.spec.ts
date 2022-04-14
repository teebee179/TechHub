import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrderListController } from './admin-order-list.controller';
import { AdminOrderListService } from './admin-order-list.service';

describe('AdminOrderListController', () => {
  let controller: AdminOrderListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOrderListController],
      providers: [AdminOrderListService],
    }).compile();

    controller = module.get<AdminOrderListController>(AdminOrderListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
