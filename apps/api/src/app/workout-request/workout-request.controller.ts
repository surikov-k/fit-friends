import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  WorkoutRequestEvent,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';
import { AccessTokenGuard } from '../../common/guards';
import { CurrentUserId } from '../../common/decorators';
import { CreateWorkoutRequestDto } from './dto';
import { CanChangeRequestStatus, CheckMongoId } from '../../common/pipes';

@ApiTags('workout-request')
@Controller('request')
export class WorkoutRequestController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  public async create(
    @Body() { user }: CreateWorkoutRequestDto,
    @CurrentUserId() currentUserId: string
  ) {
    return firstValueFrom<WorkoutRequestInterface>(
      this.userService.send(
        { cmd: WorkoutRequestEvent.CreateRequest },
        { initiator: currentUserId, user }
      )
    );
  }

  @Patch(':id/accept')
  @UseGuards(AccessTokenGuard)
  public async accept(
    @Param('id', CheckMongoId, CanChangeRequestStatus) id: string,
    @CurrentUserId() userId: string
  ) {
    return firstValueFrom<WorkoutRequestInterface>(
      this.userService.send({ cmd: WorkoutRequestEvent.AcceptRequest }, { id })
    );
  }

  @Patch(':id/reject')
  @UseGuards(AccessTokenGuard)
  public async reject(
    @Param('id', CheckMongoId, CanChangeRequestStatus) id: string,
    @CurrentUserId() userId: string
  ) {
    return firstValueFrom<WorkoutRequestInterface>(
      this.userService.send({ cmd: WorkoutRequestEvent.RejectRequest }, { id })
    );
  }
}
