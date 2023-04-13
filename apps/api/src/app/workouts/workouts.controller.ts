import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject } from '@fit-friends/core';
import { AccessTokenGuard, ClientGuard, CoachGuard } from '../../common/guards';
import { WorkoutRdo } from './rdo';
import { CreateWorkoutDto, UpdateWorkoutRdo } from './dto';
import { CurrentUserId } from '../../common/decorators';
import { CanStartWorkout } from '../../common/pipes';
import { WorkoutsService } from './workouts.service';
import { CanCompleteWorkout } from '../../common/pipes';

@ApiTags('workouts')
@Controller('workout')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

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
    const workout = await this.workoutsService.get(id);

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
    const workout = await this.workoutsService.create(coachId, dto);

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
    const workout = await this.workoutsService.update(id, dto);

    return fillObject(WorkoutRdo, workout);
  }

  @UseGuards(ClientGuard)
  @Post(':id/start')
  public async startWorkout(
    @Param('id', CanStartWorkout) id: number,
    @CurrentUserId() userId: string
  ) {
    return this.workoutsService.startWorkout(userId, id);
  }

  @UseGuards(ClientGuard)
  @Patch(':id/complete')
  public async completeWorkout(
    @Param('id', CanCompleteWorkout) id: number,
    @CurrentUserId() userId: string
  ) {
    return this.workoutsService.completeWorkout(userId, id);
  }

  @UseGuards(ClientGuard)
  @Patch('/log')
  public async getLog(@CurrentUserId() clientId: string) {
    return this.workoutsService.getLog(clientId);
  }
}
