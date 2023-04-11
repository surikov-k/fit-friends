import {
  ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { GymsEvent } from '@fit-friends/shared-types';

const INCORRECT_GYM = "This gym doesn't exist";

@Injectable()
export class CheckGymId implements PipeTransform {
  constructor(
    @Inject('GYMS_SERVICE') private readonly ordersService: ClientProxy
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }

    const gym = await firstValueFrom<number>(
      this.ordersService.send(
        { cmd: GymsEvent.Get },
        {
          id: value,
        }
      )
    );

    if (!gym) {
      throw new NotFoundException(INCORRECT_GYM);
    }

    return value;
  }
}
