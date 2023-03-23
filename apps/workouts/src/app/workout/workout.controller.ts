import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  AccessTokenGuard,
  CoachGuard,
  CurrentUserId,
  CurrentUserRole,
  fillObject,
  ValidateWithRole,
} from '@fit-friends/core';

import { WorkoutService } from './workout.service';
import { CreateWorkoutDto, UpdateWorkoutRdo } from './dto';
import { WorkoutRdo } from './rdo';
import { CheckCoachId, ValidateId } from '../common/pipes';
import { WorkoutQuery } from './query';
import { UserRole } from '@fit-friends/shared-types';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  public async index(
    @CurrentUserRole() role: string,
    @Query(ValidateWithRole) query: WorkoutQuery,
    @CurrentUserId() userId: string
  ) {
    const coachId = role === UserRole.Coach ? userId : undefined;

    return this.workoutService.getAll(coachId, query);
  }

  @Get('/:id')
  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: 'Detailed workout information',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only an authorized user can request the workout information',
  })
  @UseGuards(AccessTokenGuard)
  public async get(@Param('id', ValidateId) id: number) {
    const workout = await this.workoutService.get(id);
    return fillObject(WorkoutRdo, workout);
  }

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
    @Param('id', CheckCoachId) id: number,
    @Body() dto: UpdateWorkoutRdo
  ) {
    const workout = await this.workoutService.update(id, dto);

    return fillObject(WorkoutRdo, workout);
  }
}
