import { Expose, Transform, Type } from 'class-transformer';
import {
  ClientProfileRdo,
  CoachProfileRdo,
  ProfileRdo,
} from '../../profile/rdo';

export class UserRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public password: string;

  @Expose()
  public gender: string;

  @Expose()
  public birthday: string;

  @Expose()
  public role: string;

  @Expose()
  public location: string;

  @Expose()
  public createdAt: string;

  @Expose()
  @Type(() => ProfileRdo, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: ClientProfileRdo, name: 'Client' },
        { value: CoachProfileRdo, name: 'Coach' },
      ],
    },
  })
  public profile: ClientProfileRdo | CoachProfileRdo;
}
