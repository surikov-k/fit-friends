import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  OrderInterface,
  OrdersEvent,
  PurchaseType,
  WorkoutInterface,
  WorkoutsEvent,
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
        { cmd: WorkoutsEvent.GetWorkout },
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
      order.service = await this.getService(order);
    }

    return orders;
  }

  public async getCoachOrders(coachId: string) {
    const coachWorkouts = await firstValueFrom(
      this.workoutsService.send<WorkoutInterface[]>(
        { cmd: WorkoutsEvent.GetCoachWorkouts },
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
        { cmd: WorkoutsEvent.GetWorkout },
        { id: order.serviceId }
      )
    );

    return order;
  }

  private async getService({ purchaseType, serviceId }: OrderInterface) {
    if (purchaseType === PurchaseType.Workout) {
      return firstValueFrom(
        this.workoutsService.send<WorkoutInterface>(
          { cmd: WorkoutsEvent.GetWorkout },
          { id: serviceId }
        )
      );
    }

    // TODO: Membership purchase
    if (purchaseType === PurchaseType.Membership) {
      // return firstValueFrom(
      //   this.gymService.send<GymInterface>(
      //     { cmd: GymEvents.GetGym },
      //     { id: serviceId }
      //   ))
    }
  }
}
