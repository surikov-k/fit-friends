export const BACKEND_URL = 'http://localhost:4000/api';
export const UPLOAD_URL = 'http://localhost:3331/api/';
export const FILES_URL = 'http://localhost:3331/uploads/';

export enum AppRoute {
  Friends = '/friends',
  Main = '/main',
  NotFound = '*',
  Orders = '/orders',
  Profile = '/profile',
  Root = '/',
  Welcome = '/welcome',
  Workouts = '/workouts',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  Client = 'Client',
  Coach = 'Coach',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum StateSlice {
  App = 'APP',
  User = 'USER',
}

export enum APIRoute {
  CheckAuth = 'auth',
  Client = 'user/client',
  Coach = 'user/coach',
  Login = 'auth/login',
  Logout = 'auth/logout',
  Profile = '/user/profile',
  Register = 'auth/register',
  UploadAvatar = 'upload/avatar',
  UploadCertificate = 'upload/certificate',
  User = '/user/:id',
}
