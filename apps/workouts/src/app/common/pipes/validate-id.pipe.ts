import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { WorkoutRepository } from '../../workout/workout.repository';

const WORKOUT_NOT_FOUND = 'This workout does not exist';

@Injectable({ scope: Scope.REQUEST })
export class ValidateId implements PipeTransform {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is for params only');
    }
    const workout = await this.workoutRepository.findById(value);

    if (!workout) {
      throw new NotFoundException(WORKOUT_NOT_FOUND);
    }

    return value;
  }
}
