import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { WorkoutsController } from './workouts.controller';
import { AtStrategy, CoachStrategy } from '../../common';

@Module({
  controllers: [WorkoutsController],
  providers: [CoachStrategy, AtStrategy],
  imports: [
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
})
export class WorkoutsModule {}
