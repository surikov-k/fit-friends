import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  RequestStatus,
  UserInterface,
  WorkoutRequestInterface,
} from '@fit-friends/shared-types';
import * as mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

const WORKOUT_REQUESTS_COLLECTION = 'workout-requests';

@Schema({
  collection: WORKOUT_REQUESTS_COLLECTION,
  timestamps: true,
})
export class WorkoutRequestModel
  extends Document
  implements WorkoutRequestInterface
{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel })
  initiator: UserInterface;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel })
  user: UserInterface;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  changedAt: Date;

  @Prop({ type: String, enum: RequestStatus })
  status: RequestStatus;
}

export const WorkoutRequestSchema =
  SchemaFactory.createForClass(WorkoutRequestModel);
