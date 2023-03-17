import { Expose } from 'class-transformer';

export class SaveFileRdo {
  @Expose()
  filename: string;
}
