import { Module } from '@nestjs/common';

import { AtStrategy, RmqModule, RtStrategy } from '@fit-friends/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IsEmailUniqueConstraint } from '../../common';

@Module({
  imports: [
    RmqModule.registerRmq({
      name: 'USER_SERVICE',
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, IsEmailUniqueConstraint],
  controllers: [AuthController],
})
export class AuthModule {}
