import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProfile, ClientProfileSchema } from './client-profile.model';
import { CoachProfile, CoachProfileSchema } from './coach-profile.model';
import { ProfileRepository } from './profile.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientProfile.name, schema: ClientProfileSchema },
      { name: CoachProfile.name, schema: CoachProfileSchema },
    ]),
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
