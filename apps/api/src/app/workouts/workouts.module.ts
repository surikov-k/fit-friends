import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  controllers: [WorkoutsController],
  imports: [
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
  ],
})
export class WorkoutsModule {}
