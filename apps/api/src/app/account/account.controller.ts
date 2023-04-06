import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUserId, fillObject } from '@fit-friends/core';
import { ClientGuard } from '../../common';
import { CreateMealDto } from './dto';
import { MealRdo } from './rdo';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/meal')
  @UseGuards(ClientGuard)
  public async create(
    @Body() dto: CreateMealDto,
    @CurrentUserId() userId: string
  ) {
    const meal = await this.accountService.create({
      ...dto,
      userId,
    });

    return fillObject(MealRdo, meal);
  }

  @Post('/meals')
  @UseGuards(ClientGuard)
  public async createMany(
    @Body(new ParseArrayPipe({ items: CreateMealDto }))
    dtos: CreateMealDto[],
    @CurrentUserId() userId: string
  ) {
    const meals = await this.accountService.createMany(userId, dtos);

    return meals.map((meal) => fillObject(MealRdo, meal));
  }

  @Get('/meals')
  @UseGuards(ClientGuard)
  public async getForWeek(@CurrentUserId() userId: string) {
    const meals = await this.accountService.getForWeek(userId);

    return meals.map((meal) => fillObject(MealRdo, meal));
  }
}
