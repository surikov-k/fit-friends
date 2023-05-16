import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import jwtDecode from 'jwt-decode';

import {
  ApiError,
  ClientInterface,
  ClientProfileInterface,
  CoachInterface,
  CoachProfileInterface,
  JwtPayload,
  LoginInterface,
  RegisterInterface,
} from '@fit-friends/shared-types';

import { AppDispatch, Extra, State } from '../index';
import { APIRoute } from '../../app.constants';
import {
  dropAccessToken,
  dropRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '../../services/tokens';

export const loginAction = createAsyncThunk<
  JwtPayload,
  LoginInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>(
  'user/login',
  async ({ email, password }, { extra: { api }, rejectWithValue }) => {
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
    return jwtDecode<JwtPayload>(accessToken);
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>('user/logout', async (_, { extra: { api } }) => {
  await api.delete(APIRoute.Logout);

  dropAccessToken();
  dropRefreshToken();
});

export const registerUserAction = createAsyncThunk<
  JwtPayload,
  RegisterInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>('user/register', async (user, { extra: { api }, rejectWithValue }) => {
  let response;
  try {
    response = await api.post(APIRoute.Register, user);
  } catch (e) {
    const error = e as AxiosError<ApiError>;
    const response = error.response as AxiosResponse<ApiError>;
    return rejectWithValue(response.data);
  }
  const { accessToken, refreshToken } = response.data;
  saveAccessToken(accessToken);
  saveRefreshToken(refreshToken);

  return jwtDecode<JwtPayload>(accessToken);
});

export const saveCoachProfileAction = createAsyncThunk<
  CoachInterface,
  CoachProfileInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>(
  'user/saveCoachProfile',
  async (data, { extra: { api }, rejectWithValue }) => {
    let response;
    try {
      response = await api.patch(APIRoute.Coach, data);
    } catch (e) {
      const error = e as AxiosError<ApiError>;
      const response = error.response as AxiosResponse<ApiError>;
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const saveClientProfileAction = createAsyncThunk<
  ClientInterface,
  ClientProfileInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>(
  'user/saveClientProfile',
  async (data, { extra: { api }, rejectWithValue }) => {
    let response;
    try {
      response = await api.patch(APIRoute.Client, data);
    } catch (e) {
      const error = e as AxiosError<ApiError>;
      const response = error.response as AxiosResponse<ApiError>;
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const uploadAvatarAction = createAsyncThunk<
  string,
  unknown,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>('user/uploadAvatar', async (formData, { extra: { apiUpload } }) => {
  const response = await apiUpload.post(APIRoute.UploadAvatar, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.filename;
});
