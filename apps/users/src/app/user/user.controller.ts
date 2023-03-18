import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard, ClientGuard, CoachGuard } from '../../common/guards';
import { fillObject } from '@fit-friends/core';
import { UserService } from './user.service';
import { ClientDetailsDto, CoachDetailsDto, UpdateProfileDto } from './dto';
import { UserRdo } from './rdo';
import { CurrentUserId } from '../../common/decorators';
import { CheckMongoId, ValidateProfileUpdate } from '../../common/pipes';

@ApiTags('user')
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
    const user = await this.userService.get(id);
    return fillObject(UserRdo, user);
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
    const user = this.userService.saveClientDetails(userId, dto);

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
    const user = this.userService.saveCoachDetails(userId, dto);

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
    @Body(ValidateProfileUpdate) dto: UpdateProfileDto,
    @CurrentUserId() userId: string
  ) {
    const user = await this.userService.updateProfile(userId, dto);

    return fillObject(UserRdo, user);
  }
}
