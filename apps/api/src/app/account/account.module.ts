import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import {
  AtStrategy,
  ClientStrategy,
  CoachStrategy,
} from '../../common/strategies';
import { RmqModule } from '@fit-friends/core';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [CoachStrategy, ClientStrategy, AtStrategy, AccountService],
  imports: [
    RmqModule.registerRmq({
      name: 'NUTRITION_SERVICE',
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
export class AccountModule {}
