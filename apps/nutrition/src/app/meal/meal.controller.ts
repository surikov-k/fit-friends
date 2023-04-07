import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { MealInterface, NutritionEvent } from '@fit-friends/shared-types';
import { MealService } from './meal.service';

@Controller()
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @EventPattern({ cmd: NutritionEvent.CreateMeal })
  public async create(@Payload() data: MealInterface) {
    return this.mealService.upsert(data);
  }

  @EventPattern({ cmd: NutritionEvent.CreateMeals })
  public async createMany(
    @Payload() { dtos, userId }: { dtos: MealInterface[]; userId: string }
  ) {
    return this.mealService.upsertMany(userId, dtos);
  }

  @EventPattern({ cmd: NutritionEvent.GetMealById })
  public async get(@Payload() { id }: { id: number }) {
    return this.mealService.get(id);
  }

  @EventPattern({ cmd: NutritionEvent.GetMeals })
  public async getForWeek(@Payload() { userId }: { userId: string }) {
    return this.mealService.getForWeek(userId);
  }
}
