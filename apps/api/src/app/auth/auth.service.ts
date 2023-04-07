import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { UserEvent, UserInterface } from '@fit-friends/shared-types';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  async register(dto: RegisterDto) {
    return firstValueFrom(
      this.userService.send({ cmd: UserEvent.Register }, { dto })
    );
  }

  async verify(dto: LoginDto) {
    return firstValueFrom(
      this.userService.send<UserInterface>({ cmd: UserEvent.Verify }, { dto })
    );
  }

  public async login(dto: LoginDto) {
    return firstValueFrom(
      this.userService.send({ cmd: UserEvent.Login }, { dto })
    );
  }

  async logout(userId: string) {
    return firstValueFrom(
      this.userService.send({ cmd: UserEvent.Logout }, { userId })
    );
  }

  async refreshTokens(userId, refreshToken) {
    return firstValueFrom(
      this.userService.send(
        { cmd: UserEvent.Refresh },
        { userId, refreshToken }
      )
    );
  }
}
