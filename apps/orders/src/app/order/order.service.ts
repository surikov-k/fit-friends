import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderInterface } from '@fit-friends/shared-types';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async get(id: number) {
    return this.orderRepository.findById(id);
  }

  public async create(userId: string, dto) {
    const entity = new OrderEntity({
      userId,
      ...dto,
    });

    return this.orderRepository.create(entity);
  }

  public async findByUserId(userId: string): Promise<OrderInterface[]> | null {
    return this.orderRepository.findByUserId(userId);
  }

  public async findByServiceId(
    serviceId: number
  ): Promise<OrderInterface[]> | null {
    return this.orderRepository.findByServiceId(serviceId);
  }

  public async findWorkoutOrders(
    userId: string
  ): Promise<OrderInterface[]> | null {
    return this.orderRepository.findWorkoutOrders(userId);
  }
}
