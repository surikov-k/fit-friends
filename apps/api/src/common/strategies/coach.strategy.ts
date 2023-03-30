import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload, UserRole } from '@fit-friends/shared-types';

@Injectable()
export class CoachStrategy extends PassportStrategy(Strategy, 'coach') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
      ignoreExpiration: true,
    });
  }

  public validate(payload: JwtPayload) {
    if (payload.role !== UserRole.Coach) {
      return false;
    }

    return payload;
  }
}
