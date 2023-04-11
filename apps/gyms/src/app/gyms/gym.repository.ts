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

  public async create(item: GymEntity): Promise<GymInterface> {
    return Promise.resolve(undefined);
  }

  public async destroy(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(id: number): Promise<GymInterface | null> {
    return this.prisma.gym.findFirst({ where: { id } });
  }

  public async findAll() {
    return this.prisma.gym.findMany();
  }

  public async update(id: number, item: GymEntity): Promise<GymInterface> {
    return Promise.resolve(undefined);
  }

  public async toggleFavorite(gymId: number, userId: string) {
    let favorite = await this.prisma.favorite.findFirst({
      where: { gymId, userId },
    });

    if (!favorite) {
      favorite = await this.prisma.favorite.create({
        data: {
          userId,
          Gym: { connect: { id: gymId } },
        },
      });
    } else {
      await this.prisma.favorite.delete({ where: { id: favorite.id } });
    }

    return this.prisma.gym.findFirst({ where: { id: favorite.gymId } });
  }
}
