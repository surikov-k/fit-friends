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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

import { MealInterface, NutritionEvent } from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { AccountService } from './account.service';
import { ClientGuard, CoachGuard } from '../../common/guards';
import { WorkoutRdo } from '../workouts/rdo';
import { CoachWorkoutsListQuery } from '../workouts/query';
import { CurrentUserId } from '../../common/decorators';
import { MealRdo } from '../nutrition/rdo';
import { CreateMealDto } from '../nutrition/dto';
import { ClientOrderTotal, PurchasedWorkoutTotalRdo } from './rdo';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('NUTRITION_SERVICE') private readonly nutritionService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy,
    private readonly accountService: AccountService
  ) {}

  @Get('/workouts')
  @ApiResponse({
    type: [WorkoutRdo],
    status: HttpStatus.OK,
    description: 'List of workouts of a user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Only an authorized user can request the list of workouts',
  })
  @UseGuards(CoachGuard)
  public async getWorkouts(
    @Query() query: CoachWorkoutsListQuery,
    @CurrentUserId() userId: string
  ) {
    const workouts = await this.accountService.getCoachWorkouts(userId, query);
    return workouts.map((workout) =>
      fillObject(PurchasedWorkoutTotalRdo, workout)
    );
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

  @Get('/purchases')
  @UseGuards(ClientGuard)
  public async getPurchases(@CurrentUserId() userId: string) {
    const totals = await this.accountService.getClientOrders(userId);

    return totals.map((total) => fillObject(ClientOrderTotal, total));
  }
}
