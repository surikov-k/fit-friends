import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AccountEvent, MealInterface } from '@fit-friends/shared-types';
import { MealService } from './meal.service';

@Controller()
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @EventPattern({ cmd: AccountEvent.CreateMealLogEntry })
  public async create(@Payload() data: MealInterface) {
    return this.mealService.upsert(data);
  }

  @EventPattern({ cmd: AccountEvent.CreateMealLog })
  public async createMany(
    @Payload() { dtos, userId }: { dtos: MealInterface[]; userId: string }
  ) {
    return this.mealService.upsertMany(userId, dtos);
  }

  @EventPattern({ cmd: AccountEvent.GetMealById })
  public async get(@Payload() { id }: { id: number }) {
    return this.mealService.get(id);
  }
}
