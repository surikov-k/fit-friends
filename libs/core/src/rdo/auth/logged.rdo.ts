import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedRdo {
  @ApiProperty({
    description: 'User id',
    example: '64131f325d6cbe769dc46ebd',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'lidia.cash@example.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDEzMWYzMjVkNmNiZTc2OWRjNDZlYmQiLCJlbWFpbCI6ImxpZGlhLmNhc2hAZXhhbXBsZS5jb20iLCJuYW1lIjoi0JDQu9C40L3QsCIsInJvbGUiOiJDbGllbnQiLCJpYXQiOjE2Nzg5NzU0MzcsImV4cCI6MTY3ODk3NjMzN30.yaDlBs1ddBmfdMQkEeIIJnURg62H2CfJnefh879Ppgo',
  })
  @Expose()
  public accessToken: string;
}
