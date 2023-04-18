import { Injectable } from '@nestjs/common';

import {
  RequestStatus,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';
import { WorkoutRequestEntity } from './workout-request.entity';
import { WorkoutRequestRepository } from './workout-request.repository';

@Injectable()
export class WorkoutRequestService {
  constructor(
    private readonly workoutRequestRepository: WorkoutRequestRepository
  ) {}

  public async create(dto: WorkoutRequestInterface) {
    const entity = new WorkoutRequestEntity(dto);
    return this.workoutRequestRepository.create(entity);
  }

  public async changeStatus(id: string, status: RequestStatus) {
    const workoutRequest = await this.workoutRequestRepository.findById(id);
    const entity = new WorkoutRequestEntity(workoutRequest);
    entity.changeStatus(status);

    return this.workoutRequestRepository.update(id, entity);
  }
}
