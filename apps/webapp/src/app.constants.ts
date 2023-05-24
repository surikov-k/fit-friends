export const BACKEND_URL = 'http://localhost:4000/api';
export const UPLOAD_URL = 'http://localhost:3331/api/';
export const FILES_URL = 'http://localhost:3331/uploads/';

export enum AppRoute {
  Friends = '/profile/friends',
  CoachOrders = '/profile/orders',
  Main = '/main',
  NotFound = '*',
  NutritionLog = '/profile/nutrition',
  Orders = 'orders',
  Profile = 'profile',
  Root = '/',
  UserGyms = '/profile/gyms',
  UserPurchases = '/profile/purchases',
  Welcome = '/welcome',
  Workouts = '/workouts',
  WorkoutsProfile = '/profile/workouts',
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
  UploadVideo = 'upload/video',
  User = '/user/:id',
}
