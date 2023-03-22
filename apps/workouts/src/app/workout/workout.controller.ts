import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CoachGuard, CurrentUserId, fillObject } from '@fit-friends/core';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto, UpdateWorkoutRdo } from './dto';
import { WorkoutRdo } from './rdo';
import { WorkoutIdValidationPipe } from '../common/pipes';

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

  @Patch('/:id')
  @UseGuards(CoachGuard)
  @ApiResponse({
    type: UpdateWorkoutRdo,
    status: HttpStatus.OK,
    description: 'A workout successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Only the coach and creator of the workout can update this workout',
  })
  public async update(
    @Param('id', WorkoutIdValidationPipe) id: number,
    @Body() dto: UpdateWorkoutRdo
  ) {
    const workout = await this.workoutService.update(id, dto);

    return fillObject(WorkoutRdo, workout);
  }
}
