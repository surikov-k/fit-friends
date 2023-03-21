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
    item: WorkoutEntity
  ): Promise<WorkoutInterface> {
    return Promise.resolve(undefined);
  }
}
