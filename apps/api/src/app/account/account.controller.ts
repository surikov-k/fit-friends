import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import {
  MealInterface,
  NutritionEvent,
  WorkoutInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { ClientGuard, CoachGuard } from '../../common/guards';
import { WorkoutRdo } from '../workouts/rdo';
import { CoachWorkoutsListQuery } from '../workouts/query';
import { CurrentUserId } from '../../common/decorators';
import { MealRdo } from '../nutrition/rdo';
import { CreateMealDto } from '../nutrition/dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy,
    @Inject('NUTRITION_SERVICE') private readonly nutritionService: ClientProxy
  ) {}

  @Get('/workouts')
  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'List of workouts of a coach',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only an authorized coach can request the list of workouts',
  })
  @UseGuards(CoachGuard)
  public async index(
    @Query() query: CoachWorkoutsListQuery,
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

  @Get('/nutrition')
  @UseGuards(ClientGuard)
  public async getForWeek(@CurrentUserId() userId: string) {
    const meals = await firstValueFrom(
      this.nutritionService.send<MealInterface[]>(
        { cmd: NutritionEvent.GetMeals },
        { userId }
      )
    );

    return meals.map((meal) => fillObject(MealRdo, meal));
  }

  @Post('/nutrition')
  @UseGuards(ClientGuard)
  public async createMany(
    @Body(new ParseArrayPipe({ items: CreateMealDto }))
    dtos: CreateMealDto[],
    @CurrentUserId() userId: string
  ) {
    const meals = await firstValueFrom(
      this.nutritionService.send<MealInterface[]>(
        { cmd: NutritionEvent.CreateMeals },
        { userId, dtos }
      )
    );

    return meals.map((meal) => fillObject(MealRdo, meal));
  }
}
