import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { ClientDetailsDto } from './client-details.dto';
import { CoachDetailsDto } from './coach-details.dto';
import { RegisterDto } from '../../auth/dto';

class CommonProfile extends OmitType(RegisterDto, [
  'email',
  'password',
  'role',
] as const) {}

export class UpdateProfileDto extends PartialType(
  IntersectionType(CommonProfile, ClientDetailsDto, CoachDetailsDto)
) {}
