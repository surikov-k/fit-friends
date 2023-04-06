import { Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';
import { MealInterface } from '@fit-friends/shared-types';
import { MealEntity } from './meal.entity';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}

  public async get(id: number) {
    return this.mealRepository.findById(id);
  }

  public async upsert(data: MealInterface) {
    const entity = new MealEntity(data);

    return this.mealRepository.upsert(entity);
  }

  public async findByUserId(userId: string): Promise<MealInterface[]> {
    return this.mealRepository.findByUserid(userId);
  }

  public async getByUserId(userId: string) {
    return this.mealRepository.findByUserid(userId);
  }
}
