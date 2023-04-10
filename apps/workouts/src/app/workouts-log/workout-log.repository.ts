import { Injectable } from '@nestjs/common';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

import { CrudRepositoryInterface } from '@fit-friends/core';
import {
  WorkoutLogEntryInterface,
  WorkoutStatus,
} from '@fit-friends/shared-types';
import { WorkoutLogEntryEntity } from './workout-log-entry.entity';
import { PrismaService } from '../prisma/prisma.service';

dayjs.extend(weekday);

@Injectable()
export class WorkoutLogRepository
  implements
    CrudRepositoryInterface<
      WorkoutLogEntryEntity,
      number,
      WorkoutLogEntryInterface
    >
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    entity: WorkoutLogEntryEntity
  ): Promise<WorkoutLogEntryInterface> {
    return this.prisma.workoutLogEntry.create({
      data: entity.toObject(),
    });
  }

  public async destroy(id: number): Promise<void> {
    return;
  }

  public async findById(id: number): Promise<WorkoutLogEntryInterface | null> {
    return this.prisma.workoutLogEntry.findFirst({ where: { id } });
  }

  public async findActive(
    clientId: string,
    workoutId: number
  ): Promise<WorkoutLogEntryInterface | null> {
    return this.prisma.workoutLogEntry.findFirst({
      where: { id: workoutId, userId: clientId },
    });
  }

  public async getLog(userId) {
    const lastMonday = dayjs().weekday(-7).toDate();
    const nextMonday = dayjs().weekday(7).toDate();

    return this.prisma.workoutLogEntry.findMany({
      where: {
        AND: {
          userId,
          status: WorkoutStatus.Completed,
          createdAt: {
            lt: nextMonday,
            gte: lastMonday,
          },
        },
      },
    });
  }

  public async update(
    id: number,
    entity: WorkoutLogEntryEntity
  ): Promise<WorkoutLogEntryInterface> {
    return this.prisma.workoutLogEntry.update({
      where: { id },
      data: entity.toObject(),
    });
  }
}
