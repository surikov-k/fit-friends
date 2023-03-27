import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
