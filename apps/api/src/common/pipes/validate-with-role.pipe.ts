import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ValidateWithRole implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const role = this.request?.['user']?.['role'];
    const validationPipe = new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
      groups: [role],
    });

    return validationPipe.transform(value, metadata);
  }
}
