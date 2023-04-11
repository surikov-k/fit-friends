import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { GymsEvent } from '@fit-friends/shared-types';
import { GymService } from './gym.service';

@Controller()
export class GymController {
  constructor(private readonly gymService: GymService) {}
  @EventPattern({ cmd: GymsEvent.Get })
  public async get(@Payload() { id }: { id: number }) {
    return this.gymService.get(id);
  }

  @EventPattern({ cmd: GymsEvent.GetAll })
  public async getAll() {
    return this.gymService.getAll();
  }

  @EventPattern({ cmd: GymsEvent.ToggleFavorite })
  public async toggleFavorite(
    @Payload() { id, userId }: { id: number; userId: string }
  ) {
    return this.gymService.toggleFavorite(id, userId);
  }
}
