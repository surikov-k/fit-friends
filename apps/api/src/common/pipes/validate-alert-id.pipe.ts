import {
  ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { AlertEvent } from '@fit-friends/shared-types';

const INCORRECT_ALERT = "This alert doesn't exist or is not yours";

@Injectable()
export class ValidateAlertId implements PipeTransform {
  constructor(
    @Inject('ALERT_SERVICE') private readonly alertService: ClientProxy
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }

    const alert = await firstValueFrom<number>(
      this.alertService.send(
        { cmd: AlertEvent.Get },
        {
          id: value,
        }
      )
    );

    if (!alert) {
      throw new NotFoundException(INCORRECT_ALERT);
    }

    return value;
  }
}
