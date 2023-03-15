import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  CoachProfileInterface,
  Skill,
  Training,
} from '@fit-friends/shared-types';

@Schema({
  collection: 'profiles',
})
export class CoachProfile extends Document implements CoachProfileInterface {
  @Prop({
    type: String,
    enum: Skill,
  })
  skill: Skill;

  @Prop({
    type: String,
    enum: Training,
  })
  trainings: Training[];

  @Prop()
  certificate: string;

  @Prop()
  hasPersonalTrainings: boolean;

  @Prop()
  achievements: string;
}

export const CoachProfileSchema = SchemaFactory.createForClass(CoachProfile);
