import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { GymInterface, GymsEvent } from '@fit-friends/shared-types';
import { CheckGymId } from '../../common/pipes';

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

    return gym;
  }

  @Get()
  public async getAll() {
    const gyms = await firstValueFrom(
      this.gymService.send<GymInterface>({ cmd: GymsEvent.GetAll }, {})
    );

    return gyms;
  }
}
