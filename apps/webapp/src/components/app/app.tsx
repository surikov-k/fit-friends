import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../app.constants';
import { CoachProfile, Main, WelcomeScreen } from '../../pages';
import { ModalProvider } from '../../contexts';
import { Layout } from '../layout';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice';

import { ClientRoute, CoachRoute } from '../routs';

export function App() {
  const authStatus = useAppSelector(getAuthStatus);
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path={AppRoute.Root} element={<WelcomeScreen />} />
          <Route element={<Layout />}>
            <Route element={<ClientRoute authStatus={authStatus} />}>
              <Route path={AppRoute.Main} element={<Main />} />
            </Route>
            <Route element={<CoachRoute authStatus={authStatus} />}>
              <Route path={AppRoute.Coach} element={<CoachProfile />} />
            </Route>
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
