import * as Yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  AuthError,
  INVALID_DATE,
  PasswordLength,
  REQUIRED_FILED_MESSAGE,
  USERNAME_PATTERN,
  UsernameLength,
} from '@fit-friends/constants';
import { Gender, Location, UserRole } from '@fit-friends/shared-types';

const validationSchema = Yup.object().shape({
  upload: Yup.mixed<FileList>().test(
    'required',
    REQUIRED_FILED_MESSAGE,
    (value: FileList | undefined) => !!(value && value.length)
  ),
  avatar: Yup.string().required(REQUIRED_FILED_MESSAGE),
  name: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(UsernameLength.MIN, AuthError.NAME_TOO_SHORT)
    .max(UsernameLength.MAX, AuthError.NAME_TOO_LONG)
    .matches(USERNAME_PATTERN, AuthError.INVALID_NAME),
  email: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .email(AuthError.INVALID_EMAIL),
  birthday: Yup.date().typeError(INVALID_DATE).required(REQUIRED_FILED_MESSAGE),
  location: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Location)),
  password: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(PasswordLength.MIN, AuthError.PASSWORD_TOO_SHORT)
    .max(PasswordLength.MAX, AuthError.PASSWORD_TOO_LONG),
  gender: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Gender)),
  role: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(UserRole)),
  agreement: Yup.boolean().oneOf([true], AuthError.ACCEPT_REQUIRED),
});

export type FormValues = InferType<typeof validationSchema>;
export const registerFormOptions = { resolver: yupResolver(validationSchema) };
