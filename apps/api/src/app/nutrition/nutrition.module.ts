import { Module } from '@nestjs/common';
import { NutritionController } from './nutrition.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  providers: [],
  controllers: [NutritionController],
  imports: [
    RmqModule.registerRmq({
      name: 'NUTRITION_SERVICE',
    }),
  ],
})
export class NutritionModule {}
