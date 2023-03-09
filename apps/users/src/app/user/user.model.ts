import { Document } from 'mongoose';
import {
  Gender,
  Profile,
  UserInterface,
  UserRole,
} from '@fit-friends/shared-types';
import { Prop, Schema } from '@nestjs/mongoose';

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

  @Prop({ required: true })
  public gender: Gender;

  @Prop()
  public birthday?: Date;

  @Prop({ required: true })
  public role: UserRole;

  @Prop({ required: true })
  public location: Location;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop({ required: true })
  public profile: Profile;
}
