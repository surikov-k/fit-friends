import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { CoachProfile, Main } from '../../pages';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';

export function Root() {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Coach) {
    return <CoachProfile />;
  }
  if (authStatus === AuthorizationStatus.Client) {
    return <Main />;
  }

  return <Navigate to={AppRoute.Welcome} />;
}
