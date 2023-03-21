import { Injectable } from '@nestjs/common';

import { WorkoutInterface } from '@fit-friends/shared-types';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';
import { CreateWorkoutDto } from './dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async create(
    coachId: string,
    dto: CreateWorkoutDto
  ): Promise<WorkoutInterface> {
    const entity = new WorkoutEntity({
      ...dto,
      coachId,
      reviews: [],
      rating: 0,
      background: 'background.jpg',
    });

    return this.workoutRepository.create(entity);
  }
}
