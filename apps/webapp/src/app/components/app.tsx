import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { WelcomeScreen } from '../pages/welcome-screen';
import { AppRoute } from '../app.constants';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
