import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserRepository } from '../../app/user/user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  public async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !user;
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
