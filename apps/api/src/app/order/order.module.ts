import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [
    RmqModule.registerRmq({
      name: 'GYMS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'ORDERS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
  ],
  providers: [OrderService],
})
export class OrderModule {}
