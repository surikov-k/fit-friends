import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AccountEvent, MealInterface } from '@fit-friends/shared-types';
import { MealService } from './meal.service';

@Controller('nutrition-log')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @EventPattern({ cmd: AccountEvent.CreateMealLogEntry })
  public async create(@Payload() data: MealInterface) {
    return this.mealService.upsert(data);
  }

  @EventPattern({ cmd: AccountEvent.GetMealById })
  public async get(@Payload() { id }: { id: number }) {
    return this.mealService.get(id);
  }
}
