import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { GymInterface } from '@fit-friends/shared-types';
import { GymEntity } from './gym.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GymRepository
  implements CrudRepositoryInterface<GymEntity, number, GymInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  create(item: GymEntity): Promise<GymInterface> {
    return Promise.resolve(undefined);
  }

  destroy(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(id: number): Promise<GymInterface | null> {
    return this.prisma.gym.findFirst({ where: { id } });
  }

  public async findAll() {
    return this.prisma.gym.findMany();
  }

  update(id: number, item: GymEntity): Promise<GymInterface> {
    return Promise.resolve(undefined);
  }
}
