import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dto';
import { ClientDetailsDto } from './client-details.dto';
import { CoachDetailsDto } from './coach-details.dto';

class CommonProfile extends OmitType(RegisterDto, [
  'email',
  'password',
  'role',
] as const) {}

export class UpdateProfileDto extends PartialType(
  IntersectionType(CommonProfile, ClientDetailsDto, CoachDetailsDto)
) {}