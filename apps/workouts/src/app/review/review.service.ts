import { Injectable } from '@nestjs/common';

import { ReviewInterface } from '@fit-friends/shared-types';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { WorkoutRepository } from '../workout/workout.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly workoutRepository: WorkoutRepository
  ) {}

  public async create(dto: ReviewInterface): Promise<ReviewInterface> {
    const entity = new ReviewEntity(dto);
    const review = await this.reviewRepository.create(entity);

    const { workoutId } = review;
    await this.workoutRepository.updateRating(workoutId);

    return review;
  }

  public async getByWorkoutId(workoutId: number): Promise<ReviewInterface[]> {
    return this.reviewRepository.findByWorkoutId(workoutId);
  }
}
