import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserEvent } from '@fit-friends/shared-types';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@fit-friends/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: UserEvent.Register })
  public async register(@Payload() { dto }: { dto: RegisterDto }) {
    return await this.authService.register(dto);
  }

  @MessagePattern({ cmd: UserEvent.Login })
  public async login(@Payload() { dto }: { dto: LoginDto }) {
    return this.authService.login(dto);
  }

  @MessagePattern({ cmd: UserEvent.Verify })
  public async verify(@Payload() { dto }: { dto: LoginDto }) {
    return this.authService.verify(dto);
  }

  @MessagePattern({ cmd: UserEvent.Logout })
  logout(@Payload() { userId }: { userId: string }) {
    return this.authService.logout(userId);
  }

  @MessagePattern({ cmd: UserEvent.Refresh })
  refreshToken(
    @Payload()
    { userId, refreshToken }: { userId: string; refreshToken: string }
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @MessagePattern({ cmd: UserEvent.CheckEmail })
  checkEmail(
    @Payload()
    { email }: { email: string }
  ) {
    return this.authService.checkEmail(email);
  }

  @MessagePattern({ cmd: UserEvent.GetUser })
  getUser(
    @Payload()
    { userId }: { userId: string }
  ) {
    return this.authService.getUser(userId);
  }
}
