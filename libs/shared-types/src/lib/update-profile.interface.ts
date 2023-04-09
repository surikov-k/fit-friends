import { CoachInterface } from './coach.interface';
import { ClientInterface } from './client.interface';

export interface UpdateProfileInterface
  extends Partial<
    Omit<CoachInterface & ClientInterface, '_id' | 'refreshTokenHash'>
  > {}
