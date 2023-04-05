import { Module } from '@nestjs/common';
import { NutritionLogController } from './nutrition-log.controller';
import { NutritionLogService } from './nutrition-log.service';

@Module({
  controllers: [NutritionLogController],
  providers: [NutritionLogService],
})
export class NutritionLogModule {}
