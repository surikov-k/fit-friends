import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { fillObject } from '@fit-friends/core';
import { UserService } from './user.service';
import { ClientDetailsDto, CoachDetailsDto } from './dto';
import { UserRdo } from './rdo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  public async get(@Param('id') id: string) {
    const user = await this.userService.get(id);
    return fillObject(UserRdo, user);
  }

  @Patch('/client')
  public async updateClientDetails(@Body() dto: ClientDetailsDto) {
    const userId = '641197d25b4b28f44ff4b6bc';
    const user = this.userService.updateClientDetails(userId, dto);

    return fillObject(UserRdo, user);
  }

  @Patch('/coach')
  public async updateCoachDetails(@Body() dto: CoachDetailsDto) {
    const userId = '6411b0cf332c6121f8682a0f';
    const user = this.userService.updateCoachDetails(userId, dto);

    return fillObject(UserRdo, user);
  }
}
