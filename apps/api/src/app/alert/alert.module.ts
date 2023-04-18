import { Module } from '@nestjs/common';
import { RmqModule } from '@fit-friends/core';
import { AtStrategy } from '../../common/strategies';
import { AlertController } from './alert.controller';

@Module({
  providers: [AtStrategy],
  imports: [
    RmqModule.registerRmq({
      name: 'ALERT_SERVICE',
    }),
  ],
  controllers: [AlertController],
})
export class AlertModule {}
