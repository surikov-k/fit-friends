import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  ClientProfileInterface,
  Skill,
  TimeSpan,
  Training,
  UserRole,
} from '@fit-friends/shared-types';

@Schema({
  collection: 'profiles',
})
export class ClientProfile extends Document implements ClientProfileInterface {
  @Prop({
    type: String,
    enum: Skill,
  })
  skill: Skill;

  @Prop()
  trainings: Training[];

  @Prop({
    type: String,
    enum: TimeSpan,
  })
  duration: TimeSpan;

  @Prop()
  caloriesTarget: number;

  @Prop()
  caloriesPerDay: number;

  @Prop()
  readiness: boolean;

  @Prop({
    type: String,
    enum: UserRole,
  })
  __type: UserRole;
}

export const ClientProfileSchema = SchemaFactory.createForClass(ClientProfile);
