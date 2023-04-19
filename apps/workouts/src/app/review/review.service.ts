import { Injectable } from '@nestjs/common';

import { ReviewInterface } from '@fit-friends/shared-types';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  public async create(dto: ReviewInterface): Promise<ReviewInterface> {
    const entity = new ReviewEntity(dto);

    return this.reviewRepository.create(entity);
  }

  public async getByWorkoutId(workoutId: number): Promise<ReviewInterface[]> {
    return this.reviewRepository.findByWorkoutId(workoutId);
  }
}
