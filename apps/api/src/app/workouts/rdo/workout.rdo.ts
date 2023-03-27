import { Expose } from 'class-transformer';

export class WorkoutRdo {
  @Expose()
  public id: number;

  @Expose()
  public background: string;

  @Expose()
  public calories: number;

  @Expose()
  public coachId: string;

  @Expose()
  public description: string;

  @Expose()
  public duration: string;

  @Expose()
  public gender: string;

  @Expose()
  public isSpecialOffer: boolean;

  @Expose()
  public price: number;

  @Expose()
  public rating: number;

  @Expose()
  public reviews: number[];

  @Expose()
  public skill: string;

  @Expose()
  public title: string;

  @Expose()
  public type: string;

  @Expose()
  public video: string;
}
