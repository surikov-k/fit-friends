import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import {
  OrderInterface,
  OrdersEvent,
  WorkoutInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject('GYMS_SERVICE') private readonly gymsService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  public async get(userId) {
    const order = await firstValueFrom(
      this.ordersService.send<OrderInterface>(
        { cmd: OrdersEvent.Get },
        { userId }
      )
    );
    order.service = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.Get },
        { id: order.serviceId }
      )
    );

    return order;
  }

  public async getCoachOrders(coachId: string) {
    const coachWorkouts = await firstValueFrom(
      this.workoutsService.send<WorkoutInterface[]>(
        { cmd: WorkoutsEvent.GetByCoach },
        { coachId }
      )
    );

    const coachWorkoutsIds = coachWorkouts.reduce<number[]>(
      (acc, { id }) => acc.concat(id),
      []
    );

    const coachOrders = await firstValueFrom(
      this.ordersService.send(
        { cmd: OrdersEvent.GetCoachOrders },
        { coachId, ids: coachWorkoutsIds }
      )
    );

    return coachOrders.filter((orders) => orders.length);
  }

  public async create(userId, dto) {
    const order = await firstValueFrom(
      this.ordersService.send<OrderInterface>(
        { cmd: OrdersEvent.Create },
        { userId, dto }
      )
    );
    order.service = await firstValueFrom(
      this.workoutsService.send<WorkoutInterface>(
        { cmd: WorkoutsEvent.Get },
        { id: order.serviceId }
      )
    );

    return order;
  }
}
