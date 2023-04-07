import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { RmqModule } from '@fit-friends/core';

@Module({
  providers: [NutritionService],
  controllers: [NutritionController],
  imports: [
    RmqModule.registerRmq({
      name: 'NUTRITION_SERVICE',
    }),
  ],
})
export class NutritionModule {}
