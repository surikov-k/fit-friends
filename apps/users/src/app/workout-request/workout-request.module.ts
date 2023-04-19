import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkoutRequestController } from './workout-request.controller';
import {
  WorkoutRequestModel,
  WorkoutRequestSchema,
} from './workout-request.model';
import { WorkoutRequestService } from './workout-request.service';
import { WorkoutRequestRepository } from './workout-request.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutRequestModel.name, schema: WorkoutRequestSchema },
    ]),
  ],
  controllers: [WorkoutRequestController],
  providers: [WorkoutRequestService, WorkoutRequestRepository],
})
export class WorkoutRequestModule {}
