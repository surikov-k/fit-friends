export enum PasswordLength {
  MIN = 6,
  MAX = 12,
}

export enum UsernameLength {
  MIN = 1,
  MAX = 15,
}
export enum AuthError {
  ALREADY_EXISTS = 'User with this email already exists',
  WRONG_CREDENTIALS = 'Wrong email or password',
  INVALID_EMAIL = 'The email is not valid',
  PASSWORD_TOO_SHORT = 'Password is too short',
  PASSWORD_TOO_LONG = 'Password is too long',
  NAME_TOO_SHORT = 'User name is too short',
  NAME_TOO_LONG = 'User name is too long',
  INVALID_NAME = 'The username must contain only Latin or Cyrillic letters',
}

export const USERNAME_PATTERN = /^([a-zA-Zа-яА-Я]+)(\s[a-zA-Zа-яА-Я]+)*$/;
