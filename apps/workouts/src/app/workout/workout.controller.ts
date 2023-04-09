import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { WorkoutService } from './workout.service';
import {
  CoachWorkoutsListQueryInterface,
  WorkoutsEvent,
} from '@fit-friends/shared-types';

@Controller()
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @EventPattern({ cmd: WorkoutsEvent.GetWorkouts })
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
    return this.workoutService.findByCoach(coachId, query);
  }

  @EventPattern({ cmd: WorkoutsEvent.GetWorkout })
  public async get(@Payload() { id }: { id: number }) {
    return this.workoutService.get(id);
  }

  @EventPattern({ cmd: WorkoutsEvent.CreateWorkout })
  public async create(@Payload() { dto, coachId }) {
    // TODO: Check coachId
    return this.workoutService.create(coachId, dto);
  }

  @EventPattern({ cmd: WorkoutsEvent.UpdateWorkout })
  // TODO: Check workout id
  public async update(@Payload() { dto, id }) {
    return this.workoutService.update(id, dto);
  }

  @EventPattern({ cmd: WorkoutsEvent.GetCoachWorkouts })
  public async getCoachWorkouts(@Payload() { coachId }) {
    return this.workoutService.getCoachWorkouts(coachId);
  }
}
