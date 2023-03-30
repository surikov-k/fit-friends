import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  JwtPayload,
  UserEvent,
  UserInterface,
} from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  public async validate(payload: JwtPayload) {
    const user = await firstValueFrom(
      this.userService.send<UserInterface>(
        { cmd: UserEvent.GetUser },
        { userId: payload.sub }
      )
    );
    if (!user || !user.refreshTokenHash) {
      return false;
    }
    return payload;
  }
}
