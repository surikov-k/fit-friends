import { Expose } from 'class-transformer';

import { ProfileRdo } from './profile.rdo';

export class CoachProfileRdo extends ProfileRdo {
  @Expose()
  certificate: string;

  @Expose()
  hasPersonalTrainings: boolean;

  @Expose()
  achievements: string;
}
