import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CurrentUserId, fillObject } from '@fit-friends/core';
import { ClientGuard } from '../../common';
import { CreateMealLogEntryDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { AccountEvent } from '@fit-friends/shared-types';
import { MealLogEntryRdo } from './rdo';

@Controller('account')
export class AccountController {
  constructor(
    @Inject('ACCOUNT_SERVICE') private readonly accountService: ClientProxy
  ) {}

  @Post('/meal')
  @UseGuards(ClientGuard)
  public async createMealLogEntry(
    @Body() dto: CreateMealLogEntryDto,
    @CurrentUserId() clientId: string
  ) {
    const mealLogEntry = await firstValueFrom(
      this.accountService.send(
        { cmd: AccountEvent.CreateMealLogEntry },
        {
          clientId,
          dto,
        }
      )
    );

    return fillObject(MealLogEntryRdo, mealLogEntry);
  }
}
