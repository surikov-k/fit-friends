import { IsMongoId } from 'class-validator';
import { CanCreateWorkoutRequest } from '../../../common/validators';
import { CreateWorkoutRequestError } from '../../app.constants';

export class CreateWorkoutRequestDto {
  @IsMongoId()
  @CanCreateWorkoutRequest({
    message: CreateWorkoutRequestError.IncorrectInitiator,
  })
  user: string;
}
