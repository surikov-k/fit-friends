import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { Main, NotFound, WelcomeScreen } from '../../pages';
import { ModalProvider } from '../../contexts';
import { Layout } from '../layout';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';
import { PrivateRoute } from '../routs';
import { Profile } from '../profile';

export function App() {
  const authStatus = useAppSelector(getAuthStatus);
  if (authStatus === AuthorizationStatus.Unknown) {
    return <p>Loading</p>;
  }
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path={AppRoute.Welcome} element={<WelcomeScreen />} />
          <Route element={<Layout />}>
            <Route path={AppRoute.Profile} element={<Profile />} />
            <Route element={<PrivateRoute role={AuthorizationStatus.Client} />}>
              <Route path={AppRoute.Root} element={<Main />} />
            </Route>
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
