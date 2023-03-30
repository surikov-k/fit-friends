import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { UserEvent } from '@fit-friends/shared-types';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@fit-friends/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern({ cmd: UserEvent.Register })
  public async register(@Payload() { dto }: { dto: RegisterDto }) {
    return await this.authService.register(dto);
  }

  @EventPattern({ cmd: UserEvent.Login })
  public async login(@Payload() { dto }: { dto: LoginDto }) {
    return this.authService.login(dto);
  }

  @EventPattern({ cmd: UserEvent.Verify })
  public async verify(@Payload() { dto }: { dto: LoginDto }) {
    const user = await this.authService.verify(dto);

    return this.authService.login(user);
  }

  @EventPattern({ cmd: UserEvent.Logout })
  logout(@Payload() { userId }: { userId: string }) {
    return this.authService.logout(userId);
  }

  @EventPattern({ cmd: UserEvent.Refresh })
  refreshToken(
    @Payload()
    { userId, refreshToken }: { userId: string; refreshToken: string }
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @EventPattern({ cmd: UserEvent.CheckEmail })
  checkEmail(
    @Payload()
    { email }: { email: string }
  ) {
    return this.authService.checkEmail(email);
  }
}
