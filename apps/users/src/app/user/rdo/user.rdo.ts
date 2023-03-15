import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public password: string;

  @Expose()
  public gender: string;

  @Expose()
  public birthday: string;

  @Expose()
  public role: string;

  @Expose()
  public location: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public skill: string;

  @Expose()
  public trainings: string[];

  @Expose()
  public duration: string;

  @Expose()
  public caloriesTarget: number;

  @Expose()
  public caloriesPerDay: number;

  @Expose()
  public readiness: boolean;

  @Expose()
  public certificate: string;

  @Expose()
  public hasPersonalTrainings: boolean;

  @Expose()
  public achievements: string;
}
