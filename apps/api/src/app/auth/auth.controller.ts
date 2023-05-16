import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from '../../common/guards';
import { LoginDto, RegisterDto } from './dto';
import { CurrentUserId } from '../../common/decorators';

@ApiTags('auth')
@Controller('auth')
@UseFilters()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: RegisterDto,
    description: 'A new user is successfully created',
  })
  public async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoginDto,
    status: HttpStatus.OK,
    description: 'A user successfully logged in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect login credentials',
  })
  public async login(@Body() dto: LoginDto) {
    try {
      return await this.authService.login(dto);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'A user successfully logged out',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not logged in',
  })
  @Delete('logout')
  async logout(@CurrentUserId() userId: string) {
    try {
      await this.authService.logout(userId);
      return;
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect refresh token',
  })
  refreshToken(@CurrentUserId() userId: string, @Req() req: Request) {
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
