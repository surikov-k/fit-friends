import { Expose } from 'class-transformer';

export class PurchasedWorkoutTotalRdo {
  @Expose({ name: '_sum' })
  summary;

  @Expose()
  workout;
}
