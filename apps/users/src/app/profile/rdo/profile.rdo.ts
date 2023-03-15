import { Expose } from 'class-transformer';

import { Skill, Training } from '@fit-friends/shared-types';

export class ProfileRdo {
  @Expose()
  skill: Skill;

  @Expose()
  trainings: Training[];
}
