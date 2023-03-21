import { registerAs } from '@nestjs/config';

export const jwtOptions = registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_AT_SECRET,
}));
