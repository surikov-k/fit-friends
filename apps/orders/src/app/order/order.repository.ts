import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { OrderInterface, PurchaseType } from '@fit-friends/shared-types';
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

  public async findById(id: number): Promise<OrderInterface> {
    return this.prisma.order.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: OrderEntity): Promise<OrderInterface> {
    return this.prisma.order.update({
      where: { id },
      data: item.toObject(),
    });
  }

  public async findByClient(userId: string) {
    return await this.prisma.order.groupBy({
      where: { userId },
      by: ['serviceId', 'purchaseType'],
      _sum: { quantity: true },
    });
  }

  public async getCoachOrders(ids: number[]) {
    return this.prisma.order.groupBy({
      where: {
        purchaseType: PurchaseType.Workout,
        serviceId: { in: ids },
      },
      by: ['serviceId'],
      _sum: { quantity: true, total: true },
    });
  }

  public async findByServiceId(serviceId: number): Promise<OrderInterface[]> {
    return this.prisma.order.findMany({
      where: { serviceId },
    });
  }

  public async findWorkoutOrders(userId: string): Promise<OrderInterface[]> {
    return this.prisma.order.findMany({
      where: { userId, purchaseType: PurchaseType.Workout },
    });
  }

  public async findAvailableWorkoutOrder(
    userId: string,
    serviceId: number
  ): Promise<OrderInterface> {
    return this.prisma.order.findFirst({
      where: {
        userId,
        purchaseType: PurchaseType.Workout,
        serviceId,
        quantity: { gt: 0 },
      },
    });
  }

  public async getAvailableWorkoutsNumber(
    userId: string,
    serviceId: number
  ): Promise<number> {
    const orders = await this.prisma.order.findMany({
      where: { userId, purchaseType: PurchaseType.Workout, serviceId },
    });

    return orders.reduce(
      (availableWorkouts, { quantity }) => availableWorkouts + quantity,
      0
    );
  }
}
