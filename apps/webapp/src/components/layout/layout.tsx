import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../header';

export function Layout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}
