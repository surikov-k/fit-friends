import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { GymInterface, GymsEvent } from '@fit-friends/shared-types';
import { fillObject } from '@fit-friends/core';
import { CheckGymId } from '../../common/pipes';
import { GymRdo } from './rdo';

@Controller('gyms')
export class GymsController {
  constructor(
    @Inject('GYMS_SERVICE') private readonly gymService: ClientProxy
  ) {}

  @Get(':id')
  public async get(@Param('id', CheckGymId) id: number) {
    const gym = await firstValueFrom(
      this.gymService.send<GymInterface>({ cmd: GymsEvent.Get }, { id })
    );

    return fillObject(GymRdo, gym);
  }

  @Get()
  public async getAll() {
    const gyms = await firstValueFrom(
      this.gymService.send<GymInterface[]>({ cmd: GymsEvent.GetAll }, {})
    );

    return gyms.map((gym) => fillObject(GymRdo, gym));
  }
}
