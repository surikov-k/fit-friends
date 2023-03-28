import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

import { OrdersEvent, WorkoutsEvents } from '@fit-friends/shared-types';
import { OrderService } from './order.service';
import { lastValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(
    public readonly orderService: OrderService,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  @EventPattern({ cmd: OrdersEvent.GetMyOrders })
  public async getByUserId(@Payload() { userId }) {
    const orders = await this.orderService.findByUserId(userId);

    for (let order of orders) {
      const workout = await lastValueFrom(
        this.workoutsService.send(
          { cmd: WorkoutsEvents.GetWorkout },
          { id: order.serviceId }
        )
      );
      order.workout = workout;
    }

    return orders;
  }

  @EventPattern({ cmd: OrdersEvent.GetOrder })
  public async get(@Payload() { id }) {
    const order = await this.orderService.get(id);
    const workout = await lastValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvents.GetWorkout },
        { id: order.serviceId }
      )
    );

    return {
      ...order,
      service: workout,
    };
  }

  @EventPattern({ cmd: OrdersEvent.CreateWorkoutOrder })
  public async create(@Payload() { userId, dto }) {
    return this.orderService.create(userId, dto);
  }
}
