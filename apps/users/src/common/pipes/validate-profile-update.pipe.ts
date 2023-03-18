import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable({ scope: Scope.REQUEST })
export class ValidateProfileUpdate implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const role = this.request['user']['role'];
    const validationPipe = new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
      groups: [role],
    });
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    console.log(errors);
    return validationPipe.transform(value, metadata);
  }
}
