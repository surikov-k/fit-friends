import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { fillObject } from '@fit-friends/core';
import { UserService } from './user.service';
import { ClientDetailsDto, CoachDetailsDto } from './dto';
import { UserRdo } from './rdo';
import { CurrentUserId } from '../../common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  public async get(@Param('id') id: string) {
    const user = await this.userService.get(id);
    return fillObject(UserRdo, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/client')
  public async updateClientDetails(
    @Body() dto: ClientDetailsDto,
    @CurrentUserId() userId: string
  ) {
    const user = this.userService.updateClientDetails(userId, dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/coach')
  public async updateCoachDetails(
    @Body() dto: CoachDetailsDto,
    @CurrentUserId() userId: string
  ) {
    const user = this.userService.updateCoachDetails(userId, dto);

    return fillObject(UserRdo, user);
  }
}
