import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { fillObject } from '@fit-friends/core';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserRdo } from './rdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return fillObject(UserRdo, user);
  }

  @Post('login')
  public async login(@Body() dto: LoginDto) {
    const user = await this.authService.verify(dto);
    return this.authService.login(user);
  }

  @Get('id')
  public async get(@Param('id') id: string) {
    const user = await this.authService.get(id);
    return fillObject(UserRdo, user);
  }
}
