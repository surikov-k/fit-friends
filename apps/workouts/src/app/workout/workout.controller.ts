import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto';
import { CoachGuard, fillObject } from '@fit-friends/core';
import { WorkoutRdo } from './rdo';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(CoachGuard)
  @Post()
  public async create(@Body() dto: CreateWorkoutDto) {
    const coachId = '6411b0cf332c6121f8682a0f';
    const workout = await this.workoutService.create(coachId, dto);

    return fillObject(WorkoutRdo, workout);
  }
}
