import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../app.constants';
import { NotFound, Root, WelcomeScreen } from '../../pages';
import { Layout } from '../layout';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';
import { Profile } from '../profile';
import { ModalProvider } from '../../contexts';
import { Loading } from '../loading';

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
          <Route element={<Layout />}>
            <Route path={AppRoute.Profile} element={<Profile />} />
            <Route path={AppRoute.Root} element={<Root />} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
