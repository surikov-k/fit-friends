import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import {
  CoachWorkoutsListQueryInterface,
  GymsEvent,
  OrdersEvent,
  PurchaseType,
  WorkoutInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccountService {
  constructor(
    @Inject('GYMS_SERVICE') private readonly gymsService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  async getCoachWorkouts(
    coachId: string,
    query: CoachWorkoutsListQueryInterface
  ) {
    const workouts = await firstValueFrom<WorkoutInterface[]>(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.GetByCoach },
        { coachId, query }
      )
    );

    const workoutsIds = workouts.reduce<number[]>(
      (acc, { id }) => acc.concat([id]),
      []
    );

    const orders = await firstValueFrom(
      this.ordersService.send(
        { cmd: OrdersEvent.GetCoachOrders },
        { workoutsIds }
      )
    );

    return Promise.all(
      orders.map(async (order) => {
        order.workout = await firstValueFrom(
          this.workoutsService.send(
            { cmd: WorkoutsEvent.Get },
            { id: order.serviceId }
          )
        );

        return order;
      })
    );
  }

  public async getClientOrders(clientId: string) {
    const orders = await firstValueFrom(
      this.ordersService.send(
        { cmd: OrdersEvent.GetClientOrders },
        { clientId }
      )
    );

    return Promise.all(
      orders.map(async (order) => {
        if (order.purchaseType === PurchaseType.Workout) {
          order.service = await firstValueFrom(
            this.workoutsService.send(
              { cmd: WorkoutsEvent.Get },
              { id: order.serviceId }
            )
          );
        }

        if (order.purchaseType === PurchaseType.Membership) {
          order.service = await firstValueFrom(
            this.gymsService.send(
              { cmd: GymsEvent.Get },
              { id: order.serviceId }
            )
          );
        }
        return order;
      })
    );
  }
}
