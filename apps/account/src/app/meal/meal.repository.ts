import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { MealInterface } from '@fit-friends/shared-types';
import { MealEntity } from './meal.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MealRepository
  implements CrudRepositoryInterface<MealEntity, number, MealInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  create(item: MealEntity): Promise<MealInterface> {
    throw new Error('Method not implemented.');
  }

  public async upsert(entity: MealEntity): Promise<MealInterface> {
    const data = entity.toObject();
    const { userId, type, createdAt, calories } = data;

    return this.prisma.meal.upsert({
      where: { userId_type_createdAt: { userId, type, createdAt } },
      update: { calories },
      create: { ...data },
    });
  }

  public async destroy(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(id: number): Promise<MealInterface | null> {
    return this.prisma.meal.findFirst({
      where: { id },
    });
  }

  public async findByUserid(userId: string): Promise<MealInterface[]> {
    return this.prisma.meal.findMany({
      where: { userId },
    });
  }

  public async update(id: number, entity: MealEntity): Promise<MealInterface> {
    const data = entity.toObject();

    return this.prisma.meal.update({
      where: { id },
      data,
    });
  }

  public async getForWeek(userId: string, lastMonday: Date, nextMonday: Date) {
    return this.prisma.meal.findMany({
      where: {
        AND: {
          userId,
          createdAt: {
            lt: nextMonday,
            gte: lastMonday,
          },
        },
      },
    });
  }
}
