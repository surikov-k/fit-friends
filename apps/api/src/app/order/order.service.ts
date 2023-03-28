import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  OrderInterface,
  OrdersEvent,
  WorkoutInterface,
  WorkoutsEvents,
} from '@fit-friends/shared-types';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  public async get(userId) {
    const order = await firstValueFrom(
      this.orderService.send<OrderInterface>(
        { cmd: OrdersEvent.GetOrder },
        { userId }
      )
    );
    order.service = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvents.GetWorkout },
        { id: order.serviceId }
      )
    );

    return order;
  }

  public async getClientOrders(userId: string) {
    const orders = await firstValueFrom(
      this.orderService.send<OrderInterface[]>(
        { cmd: OrdersEvent.GetMyOrders },
        { userId }
      )
    );

    for (const order of orders) {
      order.service = await firstValueFrom(
        this.workoutsService.send<WorkoutInterface>(
          { cmd: WorkoutsEvents.GetWorkout },
          { id: order.serviceId }
        )
      );
    }

    return orders;
  }

  public async getCoachOrders(coachId: string) {
    const coachWorkouts = await firstValueFrom(
      this.workoutsService.send<WorkoutInterface[]>(
        { cmd: WorkoutsEvents.GetCoachWorkouts },
        { coachId }
      )
    );

    const coachOrders = await Promise.all(
      coachWorkouts.map((workout) => {
        return firstValueFrom(
          this.orderService.send<OrderInterface[]>(
            { cmd: OrdersEvent.GetOrderByServiceId },
            { serviceId: workout.id }
          )
        );
      })
    );

    return coachOrders.filter((orders) => orders.length);
  }

  public async create(userId, dto) {
    const order = await firstValueFrom(
      this.orderService.send<OrderInterface>(
        { cmd: OrdersEvent.CreateOrder },
        { userId, dto }
      )
    );
    order.service = await firstValueFrom(
      this.workoutsService.send<WorkoutInterface>(
        { cmd: WorkoutsEvents.GetWorkout },
        { id: order.serviceId }
      )
    );

    return order;
  }
}
