import { Expose } from 'class-transformer';

import { TimeSpan } from '@fit-friends/shared-types';
import { ProfileRdo } from './profile.rdo';

export class ClientProfileRdo extends ProfileRdo {
  @Expose()
  duration: TimeSpan;

  @Expose()
  caloriesTarget: number;

  @Expose()
  caloriesPerDay: number;

  @Expose()
  readiness: boolean;
}
