import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  Gender,
  Location,
  UserInterface,
  UserRole,
} from '@fit-friends/shared-types';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements UserInterface {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public avatar?: string;

  @Prop({ required: true, type: String, enum: Gender })
  public gender: Gender;

  @Prop()
  public birthday?: Date;

  @Prop({ required: true, type: String, enum: UserRole })
  public role: UserRole;

  @Prop({ required: true, type: String, enum: Location })
  public location: Location;

  @Prop({ required: true })
  public createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
