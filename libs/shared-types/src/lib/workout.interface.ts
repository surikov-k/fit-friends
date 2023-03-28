import {
  Gender,
  ReviewInterface,
  Skill,
  TimeSpan,
  WorkoutType,
} from '@fit-friends/shared-types';

export interface WorkoutInterface {
  id?: number;
  title: string;
  background: string;
  skill: Skill;
  type: WorkoutType;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
  duration: TimeSpan;
  reviews: ReviewInterface[];
}
