import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserError } from '../../app/user/user.constants';

export class CheckMongoId implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(UserError.INCORRECT_MONGOID);
    }

    return value;
  }
}
