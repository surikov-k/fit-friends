import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import {
  CoachWorkoutsListQueryInterface,
  OrderInterface,
  OrdersEvent,
  WorkoutInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccountService {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy
  ) {}
  async getCoachWorkouts(
    userId: string,
    query: CoachWorkoutsListQueryInterface
  ) {
    return firstValueFrom<WorkoutInterface[]>(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.GetWorkouts },
        {
          coachId: userId,
          query,
        }
      )
    );
  }

  async getClientWorkouts(userId: string) {
    const orders = await firstValueFrom<OrderInterface[]>(
      this.ordersService.send(
        { cmd: OrdersEvent.GetClientWorkoutOrders },
        { userId }
      )
    );

    return Promise.all(
      orders.map(({ serviceId }) =>
        firstValueFrom<WorkoutInterface>(
          this.workoutsService.send(
            { cmd: WorkoutsEvent.GetWorkout },
            { id: serviceId }
          )
        )
      )
    );
  }
}
