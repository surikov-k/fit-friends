import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { firstValueFrom } from 'rxjs';
import { UserEvent } from '@fit-friends/shared-types';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  public async validate(email: string): Promise<boolean> {
    const user = await firstValueFrom(
      this.userService.send({ cmd: UserEvent.CheckEmail }, { email })
    );

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
