import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  imports: [
    RmqModule.registerRmq({
      name: 'ORDER_SERVICE',
    }),
  ],
})
export class OrderModule {}
