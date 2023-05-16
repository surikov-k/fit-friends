import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';

type AuthRouteProps = {
  authStatus: AuthorizationStatus;
  children?: JSX.Element;
};

export function ClientRoute({ authStatus, children }: AuthRouteProps) {
  return authStatus === AuthorizationStatus.Client ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={AppRoute.Welcome} />
  );
}
