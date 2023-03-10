import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
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
}
