import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountEvent, MealInterface } from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';
import { CreateMealDto } from './dto';

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

  public async createMany(userId: string, dtos: CreateMealDto[]) {
    return firstValueFrom(
      this.accountService.send<MealInterface[]>(
        { cmd: AccountEvent.CreateMealLog },
        { userId, dtos }
      )
    );
  }
}
