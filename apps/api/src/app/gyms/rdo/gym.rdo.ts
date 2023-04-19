import { Expose } from 'class-transformer';

export class GymRdo {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  description: string;

  @Expose()
  features: string[];

  @Expose()
  isVerified: boolean;

  @Expose()
  location: string;

  @Expose()
  name: string;

  @Expose()
  photos: string[];

  @Expose()
  price: number;
}
