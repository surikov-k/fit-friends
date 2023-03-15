import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
