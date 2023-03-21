import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { CoachGuard, CurrentUserId, fillObject } from '@fit-friends/core';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto';
import { WorkoutRdo } from './rdo';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @UseGuards(CoachGuard)
  @ApiResponse({
    type: CreateWorkoutDto,
    status: HttpStatus.OK,
    description: 'A workout successfully created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a coach can create workouts',
  })
  public async create(
    @Body() dto: CreateWorkoutDto,
    @CurrentUserId() coachId: string
  ) {
    const workout = await this.workoutService.create(coachId, dto);

    return fillObject(WorkoutRdo, workout);
  }
}
