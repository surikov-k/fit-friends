import { Skill, Training } from '@fit-friends/shared-types';

export interface CoachProfileInterface {
  skill: Skill;
  trainings: Training[];
  certificate: string;
  hasPersonalTrainings: boolean;
  achievements: string;
}
