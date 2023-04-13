import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { fillObject } from '@fit-friends/core';
import { CreateWorkoutOrderDto } from './dto';
import { OrderRdo } from './rdo';
import { OrderService } from './order.service';
import { AccessTokenGuard } from '../../common/guards';
import { CurrentUserId } from '../../common/decorators';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
