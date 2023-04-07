import { Injectable } from '@nestjs/common';

import { WorkoutInterface } from '@fit-friends/shared-types';
import { WorkoutRepository } from './workout.repository';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async findByCoach(coachId, query) {
    return this.workoutRepository.findByCoach(coachId, query);
  }

  public async get(id: number) {
    return this.workoutRepository.findById(id);
  }

  public async create(coachId: string, dto): Promise<WorkoutInterface> {
    const entity = new WorkoutEntity({
      ...dto,
      coachId,
      reviews: [],
      rating: 0,
      background: 'background.jpg',
    });

    return this.workoutRepository.create(entity);
  }

  public async update(id: number, dto) {
    const workout = await this.workoutRepository.findById(id);
    const entity = new WorkoutEntity({
      ...workout,
      ...dto,
    });

    return this.workoutRepository.update(id, entity);
  }

  public async getCoachWorkouts(coachId: string) {
    return this.workoutRepository.findByCoachId(coachId);
  }
}
