import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  CheckMongoId,
  ClientDetailsDto,
  CoachDetailsDto,
  CurrentUserId,
  fillObject,
  UpdateProfileDto,
  UserRdo,
  ValidateWithRole,
} from '@fit-friends/core';
import { ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AccessTokenGuard, ClientGuard, CoachGuard } from '../../common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Get user details',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  public async get(@Param('id', CheckMongoId) id: string) {
    try {
      const user = await this.userService.get(id);
      return fillObject(UserRdo, user);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  @UseGuards(AccessTokenGuard)
  @UseGuards(ClientGuard)
  @Patch('/client')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Save client details',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  public async saveClientDetails(
    @Body() dto: ClientDetailsDto,
    @CurrentUserId() userId: string
  ) {
    const user = await this.userService.saveClientDetails(userId, dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(AccessTokenGuard)
  @UseGuards(CoachGuard)
  @Patch('/coach')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Save coach details',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  public async saveCoachDetails(
    @Body() dto: CoachDetailsDto,
    @CurrentUserId() userId: string
  ) {
    const user = await this.userService.saveCoachDetails(userId, dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Update user profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Patch('/profile')
  public async updateProfile(
    @Body(ValidateWithRole) dto: UpdateProfileDto,
    @CurrentUserId() userId: string
  ) {
    const user = await this.userService.updateProfile(userId, dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(ClientGuard)
  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: 'All users',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get()
  public async getAll() {
    const all = await this.userService.getAll();
    return all.map((user) => fillObject(UserRdo, user));
  }
}
