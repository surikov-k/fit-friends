import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { fillObject } from '@fit-friends/core';
import { ApiResponse } from '@nestjs/swagger';

import { AccessTokenGuard, ClientGuard, CoachGuard } from '../../common/guards';
import { UserService } from './user.service';
import { UserRdo } from './rdo';
import { ClientDetailsDto, CoachDetailsDto, UpdateProfileDto } from './dto';
import { CurrentUserId } from '../../common/decorators';
import {
  CheckCoachId,
  CheckMongoId,
  ValidateWithRole,
} from '../../common/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/friend')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: 'Get a list of users friends',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AccessTokenGuard)
  public async getFriends(@CurrentUserId() userId: string) {
    const friends = await this.userService.getFriends(userId);

    return friends.map((friend) => fillObject(UserRdo, friend));
  }

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

  @Patch('friend/:id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Toggle a friend',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AccessTokenGuard)
  public async toggleFriend(
    @Param('id', CheckMongoId) friendId,
    @CurrentUserId() userId: string
  ) {
    const user = await this.userService.toggleFriend(friendId, userId);
    return fillObject(UserRdo, user);
  }

  @Post(':coachId/subscribe')
  @UseGuards(ClientGuard)
  public async subscribeToNewWorkouts(
    @Param('coachId', CheckMongoId, CheckCoachId) coachId,
    @CurrentUserId() clientId: string
  ) {
    return this.userService.toggleSubscription(clientId, coachId);
  }
}
