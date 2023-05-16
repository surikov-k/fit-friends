import { WorkoutType } from './workout-type.type';
import { Skill } from './skill.type';

export interface CoachProfileInterface {
  certificate?: string;
  hasPersonalTrainings?: boolean;
  skill: Skill;
  trainings: WorkoutType[];
  achievements: string;
}
