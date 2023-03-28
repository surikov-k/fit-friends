import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { WorkoutInterface } from '@fit-friends/shared-types';
import { WorkoutEntity } from './workout.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutRepository
  implements CrudRepositoryInterface<WorkoutEntity, number, WorkoutInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  public async find(coachId: string, query) {
    const {
      limit,
      caloriesMin,
      caloriesMax,
      priceMin,
      priceMax,
      page,
      durations,
      rating,
      types,
    } = query;

    return this.prisma.workout.findMany({
      take: limit,
      where: {
        rating,
        coachId,
        duration: { in: durations },
        type: { in: types },
        AND: [
          { calories: { gte: caloriesMin } },
          { calories: { lte: caloriesMax } },
          { price: { gte: priceMin } },
          { price: { lte: priceMax } },
        ],
      },
      include: {
        reviews: true,
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async create(item: WorkoutEntity): Promise<WorkoutInterface> {
    const entity = item.toObject();

    return this.prisma.workout.create({
      data: {
        ...entity,
        reviews: {
          connect: [],
        },
      },
      include: {
        reviews: true,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.workout.delete({
      where: { id },
    });
  }

  public async findById(id: number): Promise<WorkoutInterface | null> {
    return this.prisma.workout.findFirst({
      where: { id },
      include: {
        reviews: true,
      },
    });
  }

  public async update(
    id: number,
    entity: WorkoutEntity
  ): Promise<WorkoutInterface> {
    const entityData = entity.toObject();
    return this.prisma.workout.update({
      where: { id },
      data: {
        ...entityData,
        reviews: {
          connect: [...entityData.reviews],
        },
      },
      include: {
        reviews: true,
      },
    });
  }

  public async findByCoachId(coachId: string): Promise<WorkoutInterface[]> {
    return this.prisma.workout.findMany({
      where: { coachId },
      include: { reviews: true },
    });
  }
}
