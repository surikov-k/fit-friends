import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { ReviewInterface } from '@fit-friends/shared-types';
import { ReviewEntity } from './review.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewRepository
  implements CrudRepositoryInterface<ReviewEntity, number, ReviewInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(entity: ReviewEntity): Promise<ReviewInterface> {
    const entityData = entity.toObject();
    return this.prisma.review.create({
      data: { ...entityData },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({ where: { id } });
  }

  public async findByWorkoutId(workoutId: number): Promise<ReviewInterface[]> {
    return this.prisma.review.findMany({
      where: { workoutId },
    });
  }

  public async findById(id: number): Promise<ReviewInterface | null> {
    return Promise.resolve(undefined);
  }

  public async update(
    id: number,
    item: ReviewEntity
  ): Promise<ReviewInterface> {
    return Promise.resolve(undefined);
  }
}
