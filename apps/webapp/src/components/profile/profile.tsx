import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { CoachProfile } from '../../pages';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';

export function Profile() {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Coach) {
    return <CoachProfile />;
  }
  if (authStatus === AuthorizationStatus.Client) {
    return <p>Client profile</p>;
  }

  return <Navigate to={AppRoute.Welcome} />;
}
