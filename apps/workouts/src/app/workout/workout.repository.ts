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
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(id: number): Promise<WorkoutInterface | null> {
    return Promise.resolve(undefined);
  }

  public async update(
    id: number,
    item: WorkoutEntity
  ): Promise<WorkoutInterface> {
    return Promise.resolve(undefined);
  }
}
