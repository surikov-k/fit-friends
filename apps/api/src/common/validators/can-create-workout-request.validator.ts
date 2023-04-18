import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { REQUEST } from '@nestjs/core';

@ValidatorConstraint({ async: true })
@Injectable({ scope: Scope.REQUEST })
export class CreateWorkoutRequestConstraint
  implements ValidatorConstraintInterface
{
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async validate(initiatorId: string): Promise<boolean> {
    const currentUserId = this.request?.['user']?.['sub'];
    return !(currentUserId === initiatorId);
  }
}

export function CanCreateWorkoutRequest(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: CreateWorkoutRequestConstraint,
    });
  };
}
