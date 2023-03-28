import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AccessTokenGuard, CurrentUserId, fillObject } from '@fit-friends/core';
import { OrderInterface, OrdersEvent } from '@fit-friends/shared-types';
import { CreateWorkoutOrderDto } from './dto';
import { WorkoutOrderRdo } from './rdo';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  public async get(@Param('id', ParseIntPipe) id: number) {
    const order = await firstValueFrom(
      this.orderService.send<OrderInterface>(
        { cmd: OrdersEvent.GetOrder },
        { id }
      )
    );

    return fillObject(WorkoutOrderRdo, order);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  public async getMy(@CurrentUserId() userId: string) {
    const orders = await firstValueFrom(
      this.orderService.send({ cmd: OrdersEvent.GetMyOrders }, { userId })
    );

    return orders.map((order) => fillObject(WorkoutOrderRdo, order));
  }

  @UseGuards(AccessTokenGuard)
  @Post('workout')
  public async create(
    @Body() dto: CreateWorkoutOrderDto,
    @CurrentUserId() userId: string
  ) {
    const order = await firstValueFrom(
      this.orderService.send(
        { cmd: OrdersEvent.CreateWorkoutOrder },
        { userId, dto }
      )
    );

    return fillObject(WorkoutOrderRdo, order);
  }
}
