import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  controllers: [GymsController],
  imports: [
    RmqModule.registerRmq({
      name: 'GYMS_SERVICE',
    }),
  ],
})
export class GymsModule {}
