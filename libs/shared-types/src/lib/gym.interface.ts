import { GymFeature } from '@fit-friends/shared-types';

export interface GymInterface {
  name: string;
  location: Location;
  isVerified: boolean;
  features: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  createdAt: Date;
}
