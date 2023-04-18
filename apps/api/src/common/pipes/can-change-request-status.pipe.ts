import { firstValueFrom } from 'rxjs';
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
import {
  WorkoutRequestEvent,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';

const INCORRECT_WORKOUT_REQUEST = 'The request is not for this user';

@Injectable({ scope: Scope.REQUEST })
export class CanChangeRequestStatus implements PipeTransform {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }

    const userId = this.request?.['user']?.['sub'];
    const workoutRequest = await firstValueFrom<WorkoutRequestInterface>(
      this.userService.send({ cmd: WorkoutRequestEvent.GetRequest }, { userId })
    );

    if (!workoutRequest) {
      throw new BadRequestException(INCORRECT_WORKOUT_REQUEST);
    }

    return value;
  }
}
