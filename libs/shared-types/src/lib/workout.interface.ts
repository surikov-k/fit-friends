import { Gender, Skill, Training, User } from '@fit-friends/shared-types';

export interface WorkoutInterface {
  name: string;
  background: string;
  skill: Skill;
  type: Training;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rating: number;
  coach: User;
  isSpecialOffer: boolean;
}
