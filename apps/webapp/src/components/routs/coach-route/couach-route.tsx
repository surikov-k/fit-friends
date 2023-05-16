import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';

type AuthRouteProps = {
  authStatus: AuthorizationStatus;
  children?: JSX.Element;
};

export function CoachRoute({ authStatus, children }: AuthRouteProps) {
  console.log('coach-route.tsx', authStatus);
  return authStatus === AuthorizationStatus.Coach ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={AppRoute.Welcome} />
  );
}
