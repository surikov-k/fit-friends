import { Skill, TimeSpan, Training } from '@fit-friends/shared-types';

export interface ClientProfileInterface {
  skill: Skill;
  trainings: Training[];
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  readiness: boolean;
}
