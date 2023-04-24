import { Test } from '@nestjs/testing';

import { MealInterface } from '@fit-friends/shared-types';
import { MealService } from './meal.service';
import { MealRepository } from './meal.repository';
import { MealEntity } from './meal.entity';

describe('MealService', () => {
  let service: MealService;
  let fakeMealRepository: Partial<MealRepository>;
  const meal: MealInterface = {
    calories: 0,
    createdAt: undefined,
    id: 1,
    type: undefined,
    userId: 'userId',
  };

  beforeEach(async () => {
    fakeMealRepository = {
      create(item: MealEntity): Promise<MealInterface> {
        return Promise.resolve(undefined);
      },
      async destroy(id: number): Promise<void> {
        return Promise.resolve(undefined);
      },
      async findById(id: number): Promise<MealInterface | null> {
        return Promise.resolve({ ...meal, id });
      },
      async findByUserid(userId: string): Promise<MealInterface[]> {
        return Promise.resolve([]);
      },
      async getForWeek(
        userId: string,
        lastMonday: Date,
        nextMonday: Date
      ): Promise<any> {
        return Promise.resolve(undefined);
      },
      async update(id: number, entity: MealEntity): Promise<MealInterface> {
        return Promise.resolve({ ...entity, id });
      },
      async upsert(entity: MealEntity): Promise<MealInterface> {
        return Promise.resolve({ ...entity, id: 1 });
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        MealService,
        {
          provide: MealRepository,
          useValue: fakeMealRepository,
        },
      ],
    }).compile();

    service = module.get(MealService);
  });

  it('can create an instance of meal service', async () => {
    expect(service).toBeDefined();
  });

  it('gets a meal log entry with id', async () => {
    const meal = await service.get(2);
    expect(meal.id).toEqual(2);
  });

  it('creates a meal log entry', async () => {
    const newMeal: MealInterface = {
      calories: 0,
      createdAt: undefined,
      type: undefined,
      userId: '',
    };
    const meal = await service.upsert(newMeal);
    expect(meal.id).toEqual(1);
  });
});
