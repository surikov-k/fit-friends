import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersEvent } from '@fit-friends/shared-types';

@Controller('order')
export class OrderController {
  constructor(public readonly orderService: OrderService) {}

  @EventPattern({ cmd: OrdersEvent.GetMyOrders })
  public async getByUserId(@Payload() { userId }) {
    userId = '64131f325d6cbe769dc46ebd';
    return this.orderService.findByUserId(userId);
  }

  @EventPattern({ cmd: OrdersEvent.GetOrder })
  public async get(@Payload() { id }) {
    return this.orderService.get(id);
  }

  @EventPattern({ cmd: OrdersEvent.CreateWorkoutOrder })
  @Post('/workout')
  public async create(@Payload() { userId, dto }) {
    userId = 'userid';
    return this.orderService.create(userId, dto);
  }
}
