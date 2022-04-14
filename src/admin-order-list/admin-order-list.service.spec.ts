import { Test, TestingModule } from '@nestjs/testing';
import { AdminOrderListService } from './admin-order-list.service';

describe('AdminOrderListService', () => {
  let service: AdminOrderListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminOrderListService],
    }).compile();

    service = module.get<AdminOrderListService>(AdminOrderListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
