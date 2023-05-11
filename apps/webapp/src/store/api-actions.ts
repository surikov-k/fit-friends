import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, LoginInterface } from '@fit-friends/shared-types';
import { AxiosError, AxiosInstance, AxiosResponse, isAxiosError } from 'axios';
import jwtDecode from 'jwt-decode';

import { AppDispatch, State } from './index';
import { APIRoute } from '../app.constants';
import { saveAccessToken, saveRefreshToken } from '../services/tokens';
import { setUser } from './user-slice';

export const loginActions = createAsyncThunk<
  void,
  LoginInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: ApiError;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    let response;
    try {
      response = await api.post(APIRoute.Login, {
        email,
        password,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<ApiError>;
        const response = error.response as AxiosResponse<ApiError>;
        return rejectWithValue(response.data);
      }
      throw e;
    }

    const { accessToken, refreshToken } = response.data;
    saveAccessToken(accessToken);
    saveRefreshToken(refreshToken);
    const user = jwtDecode(accessToken);
    dispatch(setUser(user));
  }
);
