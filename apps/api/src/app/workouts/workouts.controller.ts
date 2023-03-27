import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import {
  AccessTokenGuard,
  CoachGuard,
  CurrentUserId,
  CurrentUserRole,
  fillObject,
  ValidateWithRole,
} from '@fit-friends/core';
import {
  UserRole,
  WorkoutInterface,
  WorkoutsEvents,
} from '@fit-friends/shared-types';
import { WorkoutRdo } from './rdo';
import { WorkoutQuery } from './query';
import { CreateWorkoutDto, UpdateWorkoutRdo } from './dto';

@ApiTags('workout')
@Controller('workout')
export class WorkoutsController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  @Get()
  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'List of workouts',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only an authorized user can request the list of workouts',
  })
  @UseGuards(AccessTokenGuard)
  public async index(
    @CurrentUserRole() role: string,
    @Query(ValidateWithRole) query: WorkoutQuery,
    @CurrentUserId() userId: string
  ) {
    const coachId = role === UserRole.Coach ? userId : undefined;

    const workouts = await firstValueFrom<WorkoutInterface[]>(
      this.workoutsService.send(
        { cmd: WorkoutsEvents.GetWorkouts },
        {
          coachId,
          query,
          userId,
        }
      )
    );

    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
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
  public async get(@Param('id', ParseIntPipe) id: number) {
    const workout = await lastValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvents.GetWorkout }, { id })
    );

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
    const workout = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvents.CreateWorkout },
        {
          coachId,
          dto,
        }
      )
    );

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
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWorkoutRdo
  ) {
    const workout = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvents.UpdateWorkout },
        { id, dto }
      )
    );

    return fillObject(WorkoutRdo, workout);
  }
}
