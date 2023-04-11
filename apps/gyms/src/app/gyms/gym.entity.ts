import { EntityInterface } from '@fit-friends/core';
import { GymFeature, GymInterface, Location } from '@fit-friends/shared-types';

export class GymEntity implements EntityInterface<GymEntity>, GymInterface {
  id?: number;
  createdAt: Date;
  description: string;
  features: GymFeature[];
  isVerified: boolean;
  location: Location;
  name: string;
  photos: string[];
  price: number;

  constructor(entity: GymInterface) {
    this.fillEntity(entity);
  }

  fillEntity(entity: GymInterface): void {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.description = entity.description;
    this.features = entity.features;
    this.isVerified = entity.isVerified;
    this.location = entity.location;
    this.name = entity.name;
    this.photos = entity.photos;
    this.price = entity.price;
  }

  toObject(): GymEntity {
    return { ...this };
  }
}
