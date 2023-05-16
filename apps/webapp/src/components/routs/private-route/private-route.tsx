import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';
import { useAppSelector } from '../../../hooks';
import { getAuthStatus } from '../../../store/user-slice';

type PrivateRouteProps = {
  role: AuthorizationStatus;
  children?: JSX.Element;
};

export function PrivateRoute({ role, children }: PrivateRouteProps) {
  const authStatus = useAppSelector(getAuthStatus);

  return authStatus === role ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={AppRoute.Welcome} />
  );
}
