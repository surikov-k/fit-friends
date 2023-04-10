import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { WorkoutService } from './workout.service';
import {
  CoachWorkoutsListQueryInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';
import { WorkoutsLogService } from '../workouts-log/workouts-log.service';

@Controller()
export class WorkoutController {
  constructor(
    private readonly workoutsService: WorkoutService,
    private readonly workoutsLogService: WorkoutsLogService
  ) {}

  @EventPattern({ cmd: WorkoutsEvent.Index })
  public async index(
    @Payload()
    {
      query,
      coachId,
    }: {
      query: CoachWorkoutsListQueryInterface;
      coachId: string;
    }
  ) {
    return this.workoutsService.findByCoach(coachId, query);
  }

  @EventPattern({ cmd: WorkoutsEvent.Get })
  public async get(@Payload() { id }: { id: number }) {
    return this.workoutsService.get(id);
  }

  @EventPattern({ cmd: WorkoutsEvent.Create })
  public async create(@Payload() { dto, coachId }) {
    return this.workoutsService.create(coachId, dto);
  }

  @EventPattern({ cmd: WorkoutsEvent.Update })
  public async update(@Payload() { dto, id }) {
    return this.workoutsService.update(id, dto);
  }

  @EventPattern({ cmd: WorkoutsEvent.CoachIndex })
  public async getCoachWorkouts(@Payload() { coachId }) {
    return this.workoutsService.getCoachWorkouts(coachId);
  }

  @EventPattern({ cmd: WorkoutsEvent.Start })
  public async startWorkout(@Payload() { clientId, workoutId }) {
    return this.workoutsLogService.create(clientId, workoutId);
  }

  @EventPattern({ cmd: WorkoutsEvent.Complete })
  public async completeWorkout(@Payload() { clientId, workoutId }) {
    return this.workoutsLogService.complete(clientId, workoutId);
  }

  @EventPattern({ cmd: WorkoutsEvent.Log })
  public async getLog(@Payload() { clientId }) {
    return this.workoutsLogService.getLog(clientId);
  }

  @EventPattern({ cmd: WorkoutsEvent.CanComplete })
  public async checkActive(@Payload() { clientId, workoutId }) {
    return this.workoutsLogService.checkActive(clientId, workoutId);
  }
}
