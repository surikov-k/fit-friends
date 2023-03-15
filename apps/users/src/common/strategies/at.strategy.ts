import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from '@fit-friends/shared-types';
import { UserRepository } from '../../app/user/user.repository';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  public async validate(payload: JwtPayload) {
    const user = await this.userRepository.findById(payload.sub);

    if (!user || !user.refreshTokenHash) {
      return false;
    }

    return payload;
  }
}
