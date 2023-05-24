import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { CoachWorkouts, WorkoutLog } from '../../pages';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';

export function ProfileWorkouts() {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Coach) {
    return <CoachWorkouts />;
  }
  if (authStatus === AuthorizationStatus.Client) {
    return <WorkoutLog />;
  }

  return <Navigate to={AppRoute.NotFound} />;
}
