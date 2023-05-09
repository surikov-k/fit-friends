import * as Yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  AuthError,
  REQUIRED_FILED_MESSAGE,
  UsernameLength,
} from '@fit-friends/constants';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .email(AuthError.INVALID_EMAIL),
  password: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(UsernameLength.MIN, AuthError.PASSWORD_TOO_SHORT)
    .max(UsernameLength.MAX, AuthError.PASSWORD_TOO_LONG),
});

export type FormValues = InferType<typeof validationSchema>;
export const loginFormOptions = { resolver: yupResolver(validationSchema) };
