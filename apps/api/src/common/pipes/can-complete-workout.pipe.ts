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
import { WorkoutsEvent } from '@fit-friends/shared-types';

const INCORRECT_WORKOUT = "You didn't start this workout";

@Injectable({ scope: Scope.REQUEST })
export class CanCompleteWorkout implements PipeTransform {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutService: ClientProxy,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }

    const userId = this.request?.['user']?.['sub'];
    const canComplete = await firstValueFrom<boolean>(
      this.workoutService.send(
        { cmd: WorkoutsEvent.CanComplete },
        {
          userId,
          workoutId: value,
        }
      )
    );

    if (!canComplete) {
      throw new BadRequestException(INCORRECT_WORKOUT);
    }

    return value;
  }
}
