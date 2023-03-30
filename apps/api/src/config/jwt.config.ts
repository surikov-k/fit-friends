import { registerAs } from '@nestjs/config';

export const jwtOptions = registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_AT_SECRET,
  refreshTokenSecret: process.env.JWT_RT_SECRET,
}));
