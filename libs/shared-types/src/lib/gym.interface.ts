import { GymFeature, Location } from '@fit-friends/shared-types';

export interface GymInterface {
  id?: number;
  name: string;
  location: Location;
  isVerified: boolean;
  features: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  createdAt: Date;
}
