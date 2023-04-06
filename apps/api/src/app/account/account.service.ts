import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountEvent, MealInterface } from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_SERVICE') private readonly accountService: ClientProxy
  ) {}

  public async create(data: MealInterface) {
    return firstValueFrom(
      this.accountService.send<MealInterface>(
        { cmd: AccountEvent.CreateMealLogEntry },
        data
      )
    );
  }
}
