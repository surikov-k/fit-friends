export const BACKEND_URL = 'http://localhost:4000/api';
export const UPLOAD_URL = 'http://localhost:3331/api/';
export const FILES_URL = 'http://localhost:3331/uploads/';

export enum AppRoute {
  Main = '/main',
  NotFound = '*',
  Profile = '/profile',
  Root = '/',
  Welcome = '/welcome',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  Client = 'Client',
  Coach = 'Coach',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum NameSpace {
  App = 'APP',
  User = 'USER',
}

export enum APIRoute {
  CheckAuth = 'auth',
  Client = 'user/client',
  Coach = 'user/coach',
  Login = 'auth/login',
  Logout = 'auth/logout',
  Register = 'auth/register',
  UploadAvatar = 'upload/avatar',
}
