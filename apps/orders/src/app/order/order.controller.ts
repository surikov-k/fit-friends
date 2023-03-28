import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { OrdersEvent } from '@fit-friends/shared-types';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(public readonly orderService: OrderService) {}

  @EventPattern({ cmd: OrdersEvent.GetMyOrders })
  public async getByUserId(@Payload() { userId }) {
    return this.orderService.findByUserId(userId);
  }

  @EventPattern({ cmd: OrdersEvent.GetOrder })
  public async get(@Payload() { id }) {
    return this.orderService.get(id);
  }

  @EventPattern({ cmd: OrdersEvent.CreateOrder })
  public async create(@Payload() { userId, dto }) {
    return this.orderService.create(userId, dto);
  }

  @EventPattern({ cmd: OrdersEvent.GetOrderByServiceId })
  public async getByServiceId(@Payload() { serviceId }) {
    return this.orderService.findByServiceId(serviceId);
  }
}
