import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

const INCORRECT_MONGOID = 'Incorrect user id';

export class CheckMongoId implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe is only for params');
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(INCORRECT_MONGOID);
    }

    return value;
  }
}
