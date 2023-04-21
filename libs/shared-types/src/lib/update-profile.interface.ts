import { CoachInterface } from './coach.interface';
import { ClientInterface } from './client.interface';

export type UpdateProfileInterface = Partial<
    Omit<CoachInterface & ClientInterface, '_id' | 'refreshTokenHash'>
  >
