import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import {
  CoachWorkoutsListQueryInterface,
  WorkoutInterface,
  WorkoutsListQueryInterface,
} from '@fit-friends/shared-types';
import { WorkoutEntity } from './workout.entity';
import { PrismaService } from '../prisma/prisma.service';
import { WORKOUTS_LIST_SORT_BY_PRICE_DEFAULT } from '../app.constants';

@Injectable()
export class WorkoutRepository
  implements CrudRepositoryInterface<WorkoutEntity, number, WorkoutInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(
    query: WorkoutsListQueryInterface
  ): Promise<WorkoutInterface[]> {
    const {
      limit,
      caloriesMin,
      caloriesMax,
      priceMin,
      priceMax,
      page,
      ratingMin,
      ratingMax,
      sortByPrice = WORKOUTS_LIST_SORT_BY_PRICE_DEFAULT,
      type,
    } = query;

    return this.prisma.workout.findMany({
      take: limit,
      where: {
        type: { in: type },
        AND: [
          { calories: { gte: caloriesMin } },
          { calories: { lt: caloriesMax } },
          { price: { gte: priceMin } },
          { price: { lt: priceMax } },
          { rating: { gte: ratingMin } },
          { rating: { lt: ratingMax } },
        ],
      },
      include: {
        reviews: true,
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
      orderBy: { price: sortByPrice },
    });
  }

  public async findByCoach(
    coachId: string,
    query: CoachWorkoutsListQueryInterface
  ) {
    const {
      limit,
      caloriesMin,
      caloriesMax,
      priceMin,
      priceMax,
      page,
      durations,
      rating,
    } = query;

    return this.prisma.workout.findMany({
      take: limit,
      where: {
        rating,
        coachId,
        duration: { in: durations },
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

  public async updateRating(workoutId: number) {
    const workout = await this.findById(workoutId);
    const { reviews } = workout;
    const rating =
      reviews.reduce<number>((acc, review) => {
        acc += review.rating;
        return acc;
      }, 0) / reviews.length;

    const entity = new WorkoutEntity({ ...workout, rating });

    return this.update(workoutId, entity);
  }
}
