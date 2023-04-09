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

import {
  MealInterface,
  NutritionEvent,
  UserRole,
} from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { AccessTokenGuard, ClientGuard } from '../../common/guards';
import { WorkoutRdo } from '../workouts/rdo';
import { CoachWorkoutsListQuery } from '../workouts/query';
import { CurrentUserId, CurrentUserRole } from '../../common/decorators';
import { MealRdo } from '../nutrition/rdo';
import { CreateMealDto } from '../nutrition/dto';
import { ClientProxy } from '@nestjs/microservices';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy,
    @Inject('NUTRITION_SERVICE') private readonly nutritionService: ClientProxy,
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
  @UseGuards(AccessTokenGuard)
  public async getWorkouts(
    @Query() query: CoachWorkoutsListQuery,
    @CurrentUserId() userId: string,
    @CurrentUserRole() role: UserRole
  ) {
    let workouts;

    if (role === UserRole.Coach) {
      workouts = await this.accountService.getCoachWorkouts(userId, query);
      return workouts.map((workout) => fillObject(WorkoutRdo, workout));
    }

    if (role === UserRole.Client) {
      workouts = await this.accountService.getClientWorkouts(userId);
      return workouts.map((workout) => fillObject(WorkoutRdo, workout));
    }
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
