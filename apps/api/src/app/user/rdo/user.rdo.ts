import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'User id',
    example: '64131f325d6cbe769dc46ebd',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Алина',
  })
  @Expose()
  public name: string;
  @ApiProperty({
    description: 'User email',
    example: 'lidia.cash@example.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @Expose()
  public password: string;

  @ApiProperty({
    description: 'User avatar',
    example: '1679060336551.avatar.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Female',
  })
  @Expose()
  public gender: string;

  @ApiProperty({
    description: 'User birthday',
    example: '1999-03-23',
  })
  @Expose()
  public birthday: string;

  @ApiProperty({
    description: 'User role',
    example: 'Client',
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'User location',
    example: 'Пионерская',
  })
  @Expose()
  public location: string;

  @ApiProperty({
    description: 'User registration date',
    example: '2023-03-16',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'User skill',
    example: 'Amateur',
  })
  @Expose()
  public skill: string;

  @ApiProperty({
    description: 'User workouts',
    example: ['Йога', 'Кроссфит', 'Аэробика'],
  })
  @Expose()
  public trainings: string[];

  @ApiProperty({
    description: 'User friends',
    example: ['64243f41dd61db961a087722'],
  })
  @Expose()
  public friends: string[];

  @ApiProperty({
    description: 'Workout duration',
    example: '10-30 min',
  })
  @Expose()
  public duration: string;

  @ApiProperty({
    description: 'The number of calories to lose',
    example: 3000,
  })
  @Expose()
  public caloriesTarget: number;

  @ApiProperty({
    description: 'The number of calories to lose per day',
    example: 1500,
  })
  @Expose()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for training',
    example: true,
  })
  @Expose()
  public readiness: boolean;

  @ApiProperty({
    description: 'Coach certificates',
    example: 'merits.pdf',
  })
  @Expose()
  public certificates: string[];

  @ApiProperty({
    description: 'Ready for personal training',
    example: true,
  })
  @Expose()
  public hasPersonalTrainings: boolean;

  @ApiProperty({
    description: 'Achievements of the coach',
    example:
      'Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками.',
  })
  @Expose()
  public achievements: string;

  @ApiProperty({
    description: 'Client info',
    example:
      'Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой, рястяжкой и пилатесом. Занимаюсь как с тренером индивидуально, так и на групповых занятиях. Люблю соревнования и челленджи, так что присоединяйтесь, давайте объединяться и заниматься вместе!)',
  })
  @Expose()
  public info: string;
}
