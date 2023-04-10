import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REQUEST } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { OrdersEvent } from '@fit-friends/shared-types';

const INCORRECT_WORKOUT = "You don't have these paid workouts left";

@Injectable({ scope: Scope.REQUEST })
export class CanStartWorkout implements PipeTransform {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }

    const userId = this.request?.['user']?.['sub'];
    const workouts = await firstValueFrom<number>(
      this.ordersService.send(
        { cmd: OrdersEvent.GetAvailableWorkouts },
        {
          userId,
          workoutId: value,
        }
      )
    );

    if (!workouts) {
      throw new BadRequestException(INCORRECT_WORKOUT);
    }

    return value;
  }
}
