import { firstValueFrom } from 'rxjs';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject } from '@fit-friends/core';
import { AlertEvent, AlertInterface } from '@fit-friends/shared-types';
import { AccessTokenGuard } from '../../common/guards';
import { CurrentUserId } from '../../common/decorators';
import { CheckMongoId, ValidateAlertId } from '../../common/pipes';
import { AlertRdo } from './rdo';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(
    @Inject('ALERT_SERVICE')
    private readonly alertService: ClientProxy
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: [AlertRdo],
    status: HttpStatus.OK,
    description: 'Get a list of users alerts',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AccessTokenGuard)
  public async getByRecipient(@CurrentUserId() recipientId: string) {
    const alerts = await firstValueFrom(
      this.alertService.send<AlertInterface[]>(
        { cmd: AlertEvent.GetByRecipient },
        { recipientId }
      )
    );

    return alerts.map((alert) => fillObject(AlertRdo, alert));
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an alert',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AccessTokenGuard)
  public async delete(@Param('id', CheckMongoId, ValidateAlertId) id: string) {
    return firstValueFrom(
      this.alertService.send({ cmd: AlertEvent.Delete }, { id })
    );
  }

}
