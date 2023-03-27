import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderInterface, OrdersEvent } from '@fit-friends/shared-types';
import { CurrentUserId, fillObject } from '@fit-friends/core';
import { CreateWorkoutOrderDto } from './dto';
import { WorkoutOrderRdo } from './rdo';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy
  ) {}

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

  @Post('workout')
  public async create(
    @Body() dto: CreateWorkoutOrderDto,
    @CurrentUserId() userId: string
  ) {
    userId = 'userid';
    const order = await firstValueFrom(
      this.orderService.send(
        { cmd: OrdersEvent.CreateWorkoutOrder },
        { userId, dto }
      )
    );

    return fillObject(WorkoutOrderRdo, order);
  }
}
