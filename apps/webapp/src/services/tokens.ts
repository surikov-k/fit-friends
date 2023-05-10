const ACCESS_TOKEN_KEY = 'fit-friends-access-token';
const REFRESH_TOKEN_KEY = 'fit-friends-refresh-token';

export const getToken = (key: string): string => {
  const token = localStorage.getItem(key);
  return token ?? '';
};

export const getAccessToken = (): string => getToken(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string => getToken(REFRESH_TOKEN_KEY);

export const saveAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const saveRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const dropAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const dropRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
