import {
  ArgumentMetadata,
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

@Injectable({ scope: Scope.REQUEST })
export class ValidateId implements PipeTransform {
  constructor(
    @Inject('WORKOUTS_SERVICE')
    private readonly workoutService: ClientProxy
  ) {}

  async transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is for params only');
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
