import { Skill } from './skill.type';
import { WorkoutType } from './workout-type.type';
import { Gender } from './gender.enum';
import { TimeSpan } from './time-span.type';
import { ReviewInterface } from './review.interface';

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
