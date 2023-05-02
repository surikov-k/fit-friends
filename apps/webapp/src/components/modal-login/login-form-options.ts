import * as Yup from 'yup';
import {
  AuthError,
  REQUIRED_FILED_MESSAGE,
  UsernameLength,
} from '@fit-friends/constants';

const validationSchema = Yup.object().shape({
  email: Yup.string().required(REQUIRED_FILED_MESSAGE).email(''),
  password: Yup.string()
    .min(UsernameLength.MIN, AuthError.PASSWORD_TOO_SHORT)
    .required(REQUIRED_FILED_MESSAGE),
});
