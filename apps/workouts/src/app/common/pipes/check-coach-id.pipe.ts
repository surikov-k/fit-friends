import {
  ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkoutRepository } from '../../workout/workout.repository';
import { REQUEST } from '@nestjs/core';

const WORKOUT_NOT_FOUND = 'This workout does not exist';
const CANT_TOUCH_THIS =
  'You have to be the creator of this workout to update it';

@Injectable({ scope: Scope.REQUEST })
export class CheckCoachId implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly workoutRepository: WorkoutRepository
  ) {}

  async transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is for params only');
    }
    const workout = await this.workoutRepository.findById(value);

    if (!workout) {
      throw new NotFoundException(WORKOUT_NOT_FOUND);
    }

    if (workout.coachId !== this.request?.['user']?.['sub']) {
      throw new UnauthorizedException(CANT_TOUCH_THIS);
    }

    return value;
  }
}
