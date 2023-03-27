import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('workouts')
export class WorkoutsController {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}
}
