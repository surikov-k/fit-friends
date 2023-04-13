import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';
import { WorkoutsLogService } from '../workouts-log/workouts-log.service';
import { WorkoutLogRepository } from '../workouts-log/workout-log.repository';

@Module({
  controllers: [WorkoutController],
  providers: [
    WorkoutService,
    WorkoutRepository,
    WorkoutsLogService,
    WorkoutLogRepository,
  ],
})
export class WorkoutModule {}
