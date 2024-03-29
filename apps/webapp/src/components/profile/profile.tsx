import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { CoachProfile } from '../../pages';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';
import { ClientProfile } from '../../pages/client-profile/client-profile';

export function Profile() {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Coach) {
    return <CoachProfile />;
  }
  if (authStatus === AuthorizationStatus.Client) {
    return <ClientProfile />;
  }

  return <Navigate to={AppRoute.Welcome} />;
}
