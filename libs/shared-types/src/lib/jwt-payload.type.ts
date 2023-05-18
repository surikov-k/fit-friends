import { UserInterface } from './user.interface';

export type JwtPayload = Pick<
  UserInterface,
  'email' | 'name' | 'role' | 'avatar'
> & {
  sub: string;
};
