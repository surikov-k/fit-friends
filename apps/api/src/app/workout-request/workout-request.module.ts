import { Module } from '@nestjs/common';
import { WorkoutRequestController } from './workout-request.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  imports: [
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
  controllers: [WorkoutRequestController],
})
export class WorkoutRequestModule {}
