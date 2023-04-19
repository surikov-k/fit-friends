import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject } from '@fit-friends/core';
import { WorkoutRdo, ReviewRdo } from './rdo';
import { CreateReviewDto, CreateWorkoutDto, UpdateWorkoutRdo } from './dto';
import { AccessTokenGuard, ClientGuard, CoachGuard } from '../../common/guards';
import { CurrentUserId } from '../../common/decorators';
import { CanStartWorkout, ValidateWorkoutId } from '../../common/pipes';
import { CanCompleteWorkout } from '../../common/pipes';
import { WorkoutsService } from './workouts.service';
import { WorkoutsListQuery } from './query';

@ApiTags('workouts')
@Controller('workout')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  public async getAll(@Query() query: WorkoutsListQuery) {
    const workouts = await this.workoutsService.getAll(query);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }

  @UseGuards(ClientGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a workout log',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a client can get a workout log',
  })
  @Get('/log')
  public async getLog(@CurrentUserId() clientId: string) {
    return this.workoutsService.getLog(clientId);
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
  public async get(@Param('id', ValidateWorkoutId) id: number) {
    const workout = await this.workoutsService.get(id);

    return fillObject(WorkoutRdo, workout);
  }

  @Get(':id/reviews')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ReviewRdo],
    description: 'Get workout reviews',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a registered user can get workout reviews',
  })
  @UseGuards(AccessTokenGuard)
  public async getReviews(@Param('id', ValidateWorkoutId) id: number) {
    const reviews = await this.workoutsService.getReviews(id);

    return reviews.map((review) => fillObject(ReviewRdo, review));
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
    @Param('id', ParseIntPipe, ValidateWorkoutId) id: number,
    @Body() dto: UpdateWorkoutRdo
  ) {
    const workout = await this.workoutsService.update(id, dto);

    return fillObject(WorkoutRdo, workout);
  }

  @Post(':id/start')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Start a workout',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a client can start the workout',
  })
  @UseGuards(ClientGuard)
  public async startWorkout(
    @Param('id', CanStartWorkout) id: number,
    @CurrentUserId() userId: string
  ) {
    return this.workoutsService.startWorkout(userId, id);
  }

  @Post(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ReviewRdo,
    description: 'Create a workout review',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a registered user can create a workout review',
  })
  @UseGuards(AccessTokenGuard)
  public async createReview(
    @Param('id', ValidateWorkoutId) id: number,
    @CurrentUserId() userId: string,
    @Body() dto: CreateReviewDto
  ) {
    const review = this.workoutsService.createReview({
      workoutId: id,
      clientId: userId,
      ...dto,
    });

    return fillObject(ReviewRdo, review);
  }

  @Patch(':id/complete')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stop a workout',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only a client can complete the workout',
  })
  @UseGuards(ClientGuard)
  public async completeWorkout(
    @Param('id', CanCompleteWorkout) id: number,
    @CurrentUserId() userId: string
  ) {
    return this.workoutsService.completeWorkout(userId, id);
  }
}
