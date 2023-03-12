import { UserInterface } from '@fit-friends/shared-types';

export type JwtPayload = Pick<UserInterface, 'email' | 'name' | 'role'> & {
  sub: string;
};
