import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { AtStrategy, CoachStrategy, RmqModule } from '@fit-friends/core';

@Module({
  controllers: [WorkoutsController],
  providers: [CoachStrategy, AtStrategy],
  imports: [
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
  ],
})
export class WorkoutsModule {}
