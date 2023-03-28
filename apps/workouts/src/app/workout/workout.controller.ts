import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { WorkoutService } from './workout.service';
import { UserRole, WorkoutsEvents } from '@fit-friends/shared-types';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @EventPattern({ cmd: WorkoutsEvents.GetWorkouts })
  public async index(@Payload() { role, query, userId }) {
    const coachId = role === UserRole.Coach ? userId : undefined;

    return this.workoutService.getAll(coachId, query);
  }

  @EventPattern({ cmd: WorkoutsEvents.GetWorkout })
  public async get(@Payload() { id }) {
    return this.workoutService.get(id);
  }

  @EventPattern({ cmd: WorkoutsEvents.CreateWorkout })
  public async create(@Payload() { dto, coachId }) {
    // TODO: Check coachId
    return this.workoutService.create(coachId, dto);
  }

  @EventPattern({ cmd: WorkoutsEvents.UpdateWorkout })
  // TODO: Check workout id
  public async update(@Payload() { dto, id }) {
    return this.workoutService.update(id, dto);
  }

  @EventPattern({ cmd: WorkoutsEvents.GetCoachWorkouts })
  public async getCoachWorkouts(@Payload() { coachId }) {
    return this.workoutService.getCoachWorkouts(coachId);
  }
}
