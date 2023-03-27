import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { OrderInterface } from '@fit-friends/shared-types';
import { OrderEntity } from './order.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderRepository
  implements CrudRepositoryInterface<OrderEntity, number, OrderInterface>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderEntity): Promise<OrderInterface> {
    const data = item.toObject();

    return this.prisma.order.create({
      data,
    });
  }

  public async destroy(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findById(id: number): Promise<OrderInterface | null> {
    return this.prisma.order.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: OrderEntity): Promise<OrderInterface> {
    return Promise.resolve(undefined);
  }

  public async findByUserId(userId: string): Promise<OrderInterface[] | null> {
    return this.prisma.order.findMany({
      where: { userId },
    });
  }
}
