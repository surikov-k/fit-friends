import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import {
  Main,
  NotFound,
  NutritionLog,
  Root,
  WelcomeScreen,
  CoachOrders,
  Friends,
  UserGyms,
  UserPurchases,
} from '../../pages';
import { Layout } from '../layout';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';
import { Profile } from '../profile';
import { ModalProvider } from '../../contexts';
import { Loading } from '../loading';
import { ProfileWorkouts } from '../profile-workouts/profile-workouts';

export function App() {
  const authStatus = useAppSelector(getAuthStatus);
  if (authStatus === AuthorizationStatus.Unknown) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path={AppRoute.Welcome} element={<WelcomeScreen />} />
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Root />} />
            <Route path={AppRoute.Main} element={<Main />} />
            <Route path={AppRoute.Profile} element={<Profile />}>
              <Route path={AppRoute.Orders} element={<CoachOrders />} />
            </Route>
            <Route path={AppRoute.Friends} element={<Friends />} />
            <Route path={AppRoute.UserGyms} element={<UserGyms />} />
            <Route
              path={AppRoute.WorkoutsProfile}
              element={<ProfileWorkouts />}
            />
            <Route path={AppRoute.NutritionLog} element={<NutritionLog />} />
            <Route path={AppRoute.UserPurchases} element={<UserPurchases />} />

            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
