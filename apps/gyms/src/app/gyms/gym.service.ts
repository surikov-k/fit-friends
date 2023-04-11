import { Injectable } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { GymInterface } from '@fit-friends/shared-types';

@Injectable()
export class GymService {
  constructor(private readonly gymRepository: GymRepository) {}

  public async get(id: number): Promise<GymInterface | null> {
    return this.gymRepository.findById(id);
  }

  public async getAll(): Promise<GymInterface[]> {
    return this.gymRepository.findAll();
  }

  public async toggleFavorite(
    id: number,
    userId: string
  ): Promise<GymInterface> {
    return this.gymRepository.toggleFavorite(id, userId);
  }
}
