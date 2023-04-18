import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import {
  RequestStatus,
  WorkoutRequestEvent,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';
import { WorkoutRequestService } from './workout-request.service';

@Controller()
export class WorkoutRequestController {
  constructor(private readonly workoutRequestService: WorkoutRequestService) {}

  @EventPattern({ cmd: WorkoutRequestEvent.Create })
  public async create(@Payload() dto: WorkoutRequestInterface) {
    return this.workoutRequestService.create(dto);
  }

  @EventPattern({ cmd: WorkoutRequestEvent.Accept })
  public async accept(@Payload() id: string) {
    return this.workoutRequestService.changeStatus(id, RequestStatus.Accepted);
  }

  @EventPattern({ cmd: WorkoutRequestEvent.Decline })
  public async reject(@Payload() id: string) {
    return this.workoutRequestService.changeStatus(id, RequestStatus.Rejected);
  }
}
