import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';

type AuthRouteProps = {
  authStatus: AuthorizationStatus;
  children?: JSX.Element;
};

export function CoachRoute({ authStatus, children }: AuthRouteProps) {
  return authStatus === AuthorizationStatus.Coach ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={AppRoute.Root} />
  );
}
