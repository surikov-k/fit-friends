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
}
