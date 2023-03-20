import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [PrismaModule, WorkoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
