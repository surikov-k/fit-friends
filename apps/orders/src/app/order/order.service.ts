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

  public async getByClient(clientId: string) {
    return this.orderRepository.findByClient(clientId);
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

  public async getAvailableWorkouts(userId: string, workoutId: number) {
    return this.orderRepository.getAvailableWorkoutsNumber(userId, workoutId);
  }

  public async decreaseAvailableWorkouts(userId: string, workoutId: number) {
    const order = await this.orderRepository.findAvailableWorkoutOrder(
      userId,
      workoutId
    );
    const entity = new OrderEntity(order);
    entity.decreaseQuantity();

    return this.orderRepository.update(order.id, entity);
  }

  public async getCoachOrders(ids: number[]) {
    return this.orderRepository.getCoachOrders(ids);
  }
}
