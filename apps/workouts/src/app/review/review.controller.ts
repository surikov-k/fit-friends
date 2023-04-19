import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ReviewInterface, WorkoutsEvent } from '@fit-friends/shared-types';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @EventPattern({ cmd: WorkoutsEvent.CreateReview })
  public async create(
    @Payload() { dto }: { dto: ReviewInterface }
  ): Promise<ReviewInterface> {
    return this.reviewService.create(dto);
  }

  @EventPattern({ cmd: WorkoutsEvent.GetReviews })
  public async getReview(
    @Payload() { workoutId }: { workoutId: number }
  ): Promise<ReviewInterface[]> {
    return this.reviewService.getByWorkoutId(workoutId);
  }
}
