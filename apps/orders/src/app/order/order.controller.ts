import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { OrdersEvent } from '@fit-friends/shared-types';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(public readonly orderService: OrderService) {}

  @EventPattern({ cmd: OrdersEvent.GetClientOrders })
  public async getByClient(@Payload() { clientId }) {
    return this.orderService.getByClient(clientId);
  }

  @EventPattern({ cmd: OrdersEvent.GetCoachOrders })
  public async getByCoach(
    @Payload() { workoutsIds }: { workoutsIds: number[] }
  ) {
    return this.orderService.getCoachOrders(workoutsIds);
  }

  @EventPattern({ cmd: OrdersEvent.Get })
  public async get(@Payload() { id }) {
    return this.orderService.get(id);
  }

  @EventPattern({ cmd: OrdersEvent.Create })
  public async create(@Payload() { userId, dto }) {
    return this.orderService.create(userId, dto);
  }

  @EventPattern({ cmd: OrdersEvent.GetByServiceId })
  public async getByServiceId(@Payload() { serviceId }) {
    return this.orderService.findByServiceId(serviceId);
  }

  @EventPattern({ cmd: OrdersEvent.GetClientWorkouts })
  public async getClientWorkoutOrders(@Payload() { userId }) {
    return this.orderService.findWorkoutOrders(userId);
  }

  @EventPattern({ cmd: OrdersEvent.GetAvailableWorkouts })
  public async getAvailableWorkouts(@Payload() { userId, workoutId }) {
    return this.orderService.getAvailableWorkouts(userId, workoutId);
  }

  @EventPattern({ cmd: OrdersEvent.DecreaseAvailableWorkouts })
  public async decreaseAvailableWorkouts(@Payload() { userId, workoutId }) {
    return this.orderService.decreaseAvailableWorkouts(userId, workoutId);
  }
}
