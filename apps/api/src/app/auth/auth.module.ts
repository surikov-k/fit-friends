import { Module } from '@nestjs/common';

import { RmqModule } from '@fit-friends/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from '../../common/strategies';
import { IsEmailUniqueConstraint } from '../../common/validators';

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
