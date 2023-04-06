import { Injectable } from '@nestjs/common';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { MealInterface } from '@fit-friends/shared-types';
import { MealRepository } from './meal.repository';
import { MealEntity } from './meal.entity';

dayjs.extend(weekday);

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

  public async upsertMany(userId: string, dtos: MealInterface[]) {
    const promises = dtos.map((item) =>
      this.mealRepository.upsert(new MealEntity({ userId, ...item }))
    );

    return Promise.all(promises);
  }

  public async findByUserId(userId: string): Promise<MealInterface[]> {
    return this.mealRepository.findByUserid(userId);
  }

  public async getByUserId(userId: string) {
    return this.mealRepository.findByUserid(userId);
  }

  public async getForWeek(userId: string) {
    const lastMonday = dayjs().weekday(-7).toDate();
    const nextMonday = dayjs().weekday(7).toDate();

    return this.mealRepository.getForWeek(userId, lastMonday, nextMonday);
  }
}
