import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { CreateWorkoutOrderDto } from './dto';
import { OrderInterface } from '@fit-friends/shared-types';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async get(id: number) {
    return this.orderRepository.findById(id);
  }

  public async create(userId: string, dto: CreateWorkoutOrderDto) {
    const entity = new OrderEntity({
      userId,
      ...dto,
    });

    return this.orderRepository.create(entity);
  }

  public async findByUserId(userId: string): Promise<OrderInterface[]> | null {
    return this.orderRepository.findByUserId(userId);
  }
}
