import { GymFeature } from './gym-feature.type';
import { Location } from './location.enum';

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
  favs?: string[];
}
