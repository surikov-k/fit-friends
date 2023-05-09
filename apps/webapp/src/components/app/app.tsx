import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../app.constants';
import { WelcomeScreen } from '../../pages';
import { ModalProvider } from '../../contexts';

export function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path={AppRoute.Root} element={<WelcomeScreen />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
