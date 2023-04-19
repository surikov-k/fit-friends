import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { WorkoutsEvent } from '@fit-friends/shared-types';

const WORKOUT_NOT_FOUND = 'This workout does not exist';
const INCORRECT_WORKOUT_ID = 'Incorrect workout id';

@Injectable({ scope: Scope.REQUEST })
export class ValidateWorkoutId implements PipeTransform {
  constructor(
    @Inject('WORKOUTS_SERVICE')
    private readonly workoutService: ClientProxy
  ) {}

  async transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is for params only');
    }

    if (isNaN(value)) {
      throw new BadRequestException(INCORRECT_WORKOUT_ID);
    }

    const workout = await firstValueFrom(
      this.workoutService.send({ cmd: WorkoutsEvent.Get }, { id: value })
    );

    if (!workout) {
      throw new NotFoundException(WORKOUT_NOT_FOUND);
    }

    return value;
  }
}
