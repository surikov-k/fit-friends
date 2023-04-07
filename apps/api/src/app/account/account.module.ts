import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { AccountController } from './account.controller';
import {
  AtStrategy,
  ClientStrategy,
  CoachStrategy,
} from '../../common/strategies';

@Module({
  controllers: [AccountController],
  providers: [CoachStrategy, ClientStrategy, AtStrategy],
  imports: [
    RmqModule.registerRmq({
      name: 'NUTRITION_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'WORKOUTS_SERVICE',
    }),
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
})
export class AccountModule {}
