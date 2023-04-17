import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { WorkoutsController } from './workouts.controller';
import { AtStrategy, CoachStrategy } from '../../common/strategies';
import { WorkoutsService } from './workouts.service';

@Module({
  controllers: [WorkoutsController],
  providers: [CoachStrategy, AtStrategy, WorkoutsService],
  imports: [
    RmqModule.registerRmq({
      name: 'NOTIFICATIONS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'ORDERS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
})
export class WorkoutsModule {}
