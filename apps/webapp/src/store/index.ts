import { AxiosInstance } from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { createApi } from '../services/api';
import { BACKEND_URL, UPLOAD_URL } from '../app.constants';

export type Extra = {
  api: AxiosInstance;
  apiUpload: AxiosInstance;
};

export const api = createApi(BACKEND_URL);
export const apiUpload = createApi(UPLOAD_URL);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api, apiUpload },
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
