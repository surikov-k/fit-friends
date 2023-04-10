import { Module } from '@nestjs/common';

import { WorkoutsLogService } from './workouts-log.service';
import { WorkoutLogRepository } from './workout-log.repository';

@Module({
  controllers: [],
  providers: [WorkoutsLogService, WorkoutLogRepository],
})
export class WorkoutsLogModule {}
