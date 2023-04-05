import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [
    RmqModule.registerRmq({
      name: 'ACCOUNT_SERVICE',
    }),
  ],
})
export class AccountModule {}
