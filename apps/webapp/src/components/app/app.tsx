import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../app.constants';
import { Main, WelcomeScreen } from '../../pages';
import { ModalProvider } from '../../contexts';
import { Layout } from '../layout';

export function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path={AppRoute.Root} element={<WelcomeScreen />} />
          <Route element={<Layout />}>
            <Route path={AppRoute.Main} element={<Main />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
