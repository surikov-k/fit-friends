export const BACKEND_URL = 'http://localhost:4000/api';
export const UPLOAD_URL = 'http://localhost:3331/api/';
export const FILES_URL = 'http://localhost:3331/uploads/';

export enum AppRoute {
  Root = '/',
  Main = '/main',
  Welcome = '/welcome',
  Coach = '/coach-profile',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  Client = 'CLIENT',
  Coach = 'COACH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  App = 'APP',
  User = 'USER',
}

export enum APIRoute {
  Login = 'auth/login',
  Logout = 'auth/logout',
  Register = 'auth/register',
  Coach = 'user/coach',
  Client = 'user/client',
  UploadAvatar = 'upload/avatar',
}
