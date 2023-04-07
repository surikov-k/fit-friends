import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MealInterface, NutritionEvent } from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';
import { CreateMealDto } from './dto';

@Injectable()
export class NutritionService {
  constructor(
    @Inject('NUTRITION_SERVICE') private readonly accountService: ClientProxy
  ) {}

  public async create(data: MealInterface) {
    return firstValueFrom(
      this.accountService.send<MealInterface>(
        { cmd: NutritionEvent.CreateMeal },
        data
      )
    );
  }

  public async createMany(userId: string, dtos: CreateMealDto[]) {
    return firstValueFrom(
      this.accountService.send<MealInterface[]>(
        { cmd: NutritionEvent.CreateMeals },
        { userId, dtos }
      )
    );
  }

  public async getForWeek(userId: string) {
    return firstValueFrom(
      this.accountService.send<MealInterface[]>(
        { cmd: NutritionEvent.GetMeals },
        { userId }
      )
    );
  }
}
