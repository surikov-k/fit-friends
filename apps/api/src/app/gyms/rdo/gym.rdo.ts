import { Expose } from 'class-transformer';
import { GymFeature, GymInterface, Location } from '@fit-friends/shared-types';

export class GymRdo implements GymInterface {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  description: string;

  @Expose()
  features: GymFeature[];

  @Expose()
  isVerified: boolean;

  @Expose()
  location: Location;

  @Expose()
  name: string;

  @Expose()
  photos: string[];

  @Expose()
  price: number;
}
