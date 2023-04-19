import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { WorkoutRepository } from '../workout/workout.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, WorkoutRepository],
})
export class ReviewModule {}
