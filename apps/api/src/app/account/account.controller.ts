import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import { WorkoutInterface, WorkoutsEvent } from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { CoachGuard } from '../../common/guards';
import { WorkoutRdo } from '../workouts/rdo';
import { WorkoutQuery } from '../workouts/query';
import { ValidateWithRole } from '../../common/pipes';
import { CurrentUserId } from '../../common/decorators';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  @Get('/workouts')
  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'List of workouts',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only an authorized user can request the list of workouts',
  })
  @UseGuards(CoachGuard)
  public async index(
    @Query(ValidateWithRole) query: WorkoutQuery,
    @CurrentUserId() coachId: string
  ) {
    const workouts = await firstValueFrom<WorkoutInterface[]>(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.GetWorkouts },
        {
          coachId,
          query,
        }
      )
    );

    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }
}
