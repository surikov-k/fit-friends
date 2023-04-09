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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { fillObject } from '@fit-friends/core';
import { WorkoutsEvent } from '@fit-friends/shared-types';
import { AccessTokenGuard, CoachGuard } from '../../common/guards';
import { WorkoutRdo } from './rdo';
import { CreateWorkoutDto, UpdateWorkoutRdo } from './dto';
import { CurrentUserId } from '../../common/decorators';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

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
  public async get(@Param('id') id: number) {
    const workout = await lastValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.GetWorkout }, { id })
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
        { cmd: WorkoutsEvent.CreateWorkout },
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
        { cmd: WorkoutsEvent.UpdateWorkout },
        { id, dto }
      )
    );

    return fillObject(WorkoutRdo, workout);
  }
}
