import { Module } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { RmqModule } from '@fit-friends/core';

@Module({
  imports: [
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
