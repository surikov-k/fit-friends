import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RmqModule } from '@fit-friends/core';
import {
  AtStrategy,
  ClientStrategy,
  CoachStrategy,
} from '../../common/strategies';

@Module({
  imports: [
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, CoachStrategy, AtStrategy, ClientStrategy],
})
export class UserModule {}
