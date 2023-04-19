import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo';

export class ReviewRdo {
  @Expose()
  createdAt: Date;

  @Expose()
  id: number;

  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  @Type(() => UserRdo)
  user: UserRdo;
}
