import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MealInterface, NutritionEvent } from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { ClientGuard } from '../../common/guards';
import { CurrentUserId } from '../../common/decorators';
import { CreateMealDto } from './dto';
import { MealRdo } from './rdo';

@Controller('nutrition')
export class NutritionController {
  constructor(
    @Inject('NUTRITION_SERVICE') private readonly nutritionService: ClientProxy
  ) {}

  @Post('/meal')
  @UseGuards(ClientGuard)
  public async create(
    @Body() dto: CreateMealDto,
    @CurrentUserId() userId: string
  ) {
    const meal = await firstValueFrom(
      this.nutritionService.send<MealInterface>(
        { cmd: NutritionEvent.CreateMeal },
        {
          ...dto,
          userId,
        }
      )
    );

    return fillObject(MealRdo, meal);
  }
}
