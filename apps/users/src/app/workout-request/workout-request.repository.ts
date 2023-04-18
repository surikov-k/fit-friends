import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { WorkoutRequestInterface } from '@fit-friends/shared-types';
import { WorkoutRequestModel } from './workout-request.model';
import { WorkoutRequestEntity } from './workout-request.entity';

export class WorkoutRequestRepository
  implements
    CrudRepositoryInterface<
      WorkoutRequestEntity,
      string,
      WorkoutRequestInterface
    >
{
  constructor(
    @InjectModel(WorkoutRequestModel.name)
    private readonly workoutRequestModel: Model<WorkoutRequestInterface>
  ) {}

  public async create(
    entity: WorkoutRequestEntity
  ): Promise<WorkoutRequestInterface> {
    const workoutRequest = new this.workoutRequestModel(entity);
    return workoutRequest.save();
  }

  public async destroy(id: string): Promise<void> {
    this.workoutRequestModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<WorkoutRequestEntity | null> {
    return this.workoutRequestModel.findOne({ id });
  }

  public async update(
    id: string,
    entity: WorkoutRequestEntity
  ): Promise<WorkoutRequestInterface> {
    return this.workoutRequestModel
      .findByIdAndUpdate(id, entity.toObject(), { new: true })
      .exec();
  }

  public async findByInitiatorId(
    initiatorId: string
  ): Promise<WorkoutRequestInterface[]> {
    return this.workoutRequestModel.find({ initiator: initiatorId }).exec();
  }

  public async findByUserId(
    userId: string
  ): Promise<WorkoutRequestInterface[]> {
    return this.workoutRequestModel.find({ user: userId }).exec();
  }
}
