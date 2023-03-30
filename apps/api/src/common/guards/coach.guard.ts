import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoachGuard extends AuthGuard('coach') {}
