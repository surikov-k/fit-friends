import { Module } from '@nestjs/common';

import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { GymRepository } from './gym.repository';

@Module({
  controllers: [GymController],
  providers: [GymService, GymRepository],
})
export class GymModule {}
