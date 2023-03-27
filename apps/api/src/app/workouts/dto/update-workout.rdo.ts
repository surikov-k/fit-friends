import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutRdo extends PartialType(CreateWorkoutDto) {}
