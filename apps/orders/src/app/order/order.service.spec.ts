import { Test } from '@nestjs/testing';

import { OrderInterface, PurchaseType } from '@fit-friends/shared-types';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let fakeOrderRepository: Partial<OrderRepository>;
  const order: OrderInterface = {
    payment: undefined,
    price: 0,
    purchaseType: undefined,
    quantity: 0,
    serviceId: 0,
    userId: 'userId',
  };

  beforeEach(async () => {
    fakeOrderRepository = {
      async create(item: OrderEntity): Promise<OrderInterface> {
        return Promise.resolve({ ...order, id: 1 });
      },
      async findAvailableWorkoutOrder(
        userId: string,
        serviceId: number
      ): Promise<OrderInterface> {
        return Promise.resolve(undefined);
      },
      async findByClient(userId: string): Promise<any> {
        return Promise.resolve({ ...order, userId });
      },
      async findById(id: number): Promise<OrderInterface> {
        return Promise.resolve({ ...order, id });
      },
      async findByServiceId(serviceId: number): Promise<OrderInterface[]> {
        return Promise.resolve([]);
      },
      async findWorkoutOrders(userId: string): Promise<OrderInterface[]> {
        return Promise.resolve([
          { ...order, id: 1, userId, purchaseType: PurchaseType.Workout },
          { ...order, id: 2, userId, purchaseType: PurchaseType.Workout },
        ]);
      },
      async getAvailableWorkoutsNumber(
        userId: string,
        serviceId: number
      ): Promise<number> {
        return Promise.resolve(5);
      },
      async getCoachOrders(ids: number[]): Promise<any> {
        return Promise.resolve(undefined);
      },
      async update(id: number, item: OrderEntity): Promise<OrderInterface> {
        return Promise.resolve(undefined);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: fakeOrderRepository,
        },
      ],
    }).compile();

    service = module.get(OrderService);
  });

  it('can create an instance of order service', async () => {
    expect(service).toBeDefined();
  });

  it('creates an order', async () => {
    const newOrder = await service.create('userId', {
      payment: undefined,
      price: 0,
      purchaseType: undefined,
      quantity: 0,
      serviceId: 0,
    });
    expect(newOrder.userId).toEqual('userId');
  });

  it('finds an order by id', async () => {
    const result = await service.get(2);
    expect(result.id).toEqual(2);
  });

  it('finds workout orders', async () => {
    const orders = await service.findWorkoutOrders('userId');
    expect(orders.length).toEqual(2);
    orders.forEach((order) => {
      expect(order.purchaseType).toEqual(PurchaseType.Workout);
    });
  });

  it('gets available workouts number', async () => {
    const number = await service.getAvailableWorkouts('userId', 1);
    expect(number).toEqual(5);
  });
});
