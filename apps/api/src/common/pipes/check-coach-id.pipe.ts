import {
  ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { UserEvent, UserInterface, UserRole } from '@fit-friends/shared-types';

const COACH_NOT_FOUND = "A coach with this id wasn't found";

@Injectable()
export class CheckCoachId implements PipeTransform {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: ClientProxy
  ) {}

  async transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is for params only');
    }
    const user = await firstValueFrom(
      this.usersService.send<UserInterface>(
        { cmd: UserEvent.GetUser },
        { userId: value }
      )
    );

    if (!user && user.role !== UserRole.Coach) {
      throw new NotFoundException(COACH_NOT_FOUND);
    }

    return value;
  }
}
