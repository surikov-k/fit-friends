import { Injectable } from '@nestjs/common';

import { WorkoutLogRepository } from './workout-log.repository';
import { WorkoutLogEntryEntity } from './workout-log-entry.entity';

@Injectable()
export class WorkoutsLogService {
  constructor(private readonly workoutLogRepository: WorkoutLogRepository) {}

  public async create(userId, workoutId) {
    const entity = new WorkoutLogEntryEntity({ userId, workoutId });

    return this.workoutLogRepository.create(entity);
  }

  public async complete(clientId, workoutId) {
    const logEntry = await this.workoutLogRepository.findActive(
      clientId,
      workoutId
    );
    const entity = new WorkoutLogEntryEntity(logEntry);
    entity.completeWorkout();

    return this.workoutLogRepository.update(logEntry.id, entity);
  }

  public async getLog(userId) {
    return this.workoutLogRepository.getLog(userId);
  }

  public async checkActive(clientId, workoutId): Promise<boolean> {
    return !!(await this.workoutLogRepository.findActive(clientId, workoutId));
  }
}
