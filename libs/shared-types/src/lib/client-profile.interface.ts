import { TimeSpan } from './time-span.type';
import { Skill } from './skill.type';
import { WorkoutType } from './workout-type.type';

export interface ClientProfileInterface {
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  skill: Skill;
  trainings: WorkoutType[];
  info?: string;
}
