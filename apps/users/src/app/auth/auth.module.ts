import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { IsEmailUniqueConstraint } from '../../common/validators';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, IsEmailUniqueConstraint],
})
export class AuthModule {}
