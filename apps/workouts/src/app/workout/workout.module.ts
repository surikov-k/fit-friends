import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';
import { AtStrategy, CoachStrategy } from '@fit-friends/core';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository, CoachStrategy, AtStrategy],
})
export class WorkoutModule {}
