import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  Gender,
  Location,
  Skill,
  TimeSpan,
  UserInterface,
  UserRole,
  WorkoutType,
} from '@fit-friends/shared-types';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements UserInterface {
  @Prop({ required: true })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({ required: true, type: String, enum: Gender })
  public gender: Gender;

  @Prop()
  public birthday?: Date;

  @Prop({ required: true, type: String, enum: UserRole })
  public role: UserRole;

  @Prop({ required: true, type: String, enum: Location })
  public location: Location;

  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @Prop({ type: String, enum: Skill })
  public skill: Skill;

  @Prop({ type: [String], enum: WorkoutType })
  public trainings: WorkoutType[];

  @Prop({ type: String, enum: TimeSpan })
  public duration: TimeSpan;

  @Prop()
  public caloriesTarget: number;

  @Prop()
  public caloriesPerDay: number;

  @Prop()
  public readiness: boolean;

  @Prop()
  public refreshTokenHash: string;

  @Prop()
  public certificate: string;

  @Prop()
  public hasPersonalTrainings: boolean;

  @Prop()
  public achievements: string;

  @Prop()
  public info: string;

  @Prop()
  public friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
