import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  AccessTokenGuard,
  CurrentUserId,
  CurrentUserRole,
  fillObject,
} from '@fit-friends/core';
import { UserRole } from '@fit-friends/shared-types';
import { CreateWorkoutOrderDto } from './dto';
import { OrderRdo } from './rdo';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/my')
  public async getMy(
    @CurrentUserId() userId: string,
    @CurrentUserRole() role: UserRole
  ) {
    if (role === UserRole.Client) {
      const orders = await this.orderService.getClientOrders(userId);
      return orders.map((order) => fillObject(OrderRdo, order));
    }

    if (role === UserRole.Coach) {
      const orders = await this.orderService.getCoachOrders(userId);
      return orders;
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  public async get(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.get(id);
    return fillObject(OrderRdo, order);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  public async create(
    @Body() dto: CreateWorkoutOrderDto,
    @CurrentUserId() userId: string
  ) {
    const order = await this.orderService.create(userId, dto);

    return fillObject(OrderRdo, order);
  }
}
