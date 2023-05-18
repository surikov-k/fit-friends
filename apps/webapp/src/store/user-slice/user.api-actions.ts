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
  UpdateProfileInterface,
  UserInterface,
} from '@fit-friends/shared-types';

import { AppDispatch, Extra, State } from '../index';
import { APIRoute, AuthorizationStatus } from '../../app.constants';
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

export const updateUserProfileAction = createAsyncThunk<
  CoachInterface,
  UpdateProfileInterface,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
    rejectValue: ApiError;
  }
>(
  'user/updateCoachProfile',
  async (data, { extra: { api }, rejectWithValue }) => {
    let response;
    try {
      response = await api.patch(APIRoute.Profile, data);
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

export const checkAuth = createAsyncThunk<
  AuthorizationStatus,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
  }
>('user/checkAuth', async (_, { extra: { api } }) => {
  const { data } = await api.get(APIRoute.CheckAuth);
  return data;
});

export const fetchUserInfo = createAsyncThunk<
  UserInterface,
  UserInterface['_id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
  }
>('user/getUserInfo', async (userId, { extra: { api }, rejectWithValue }) => {
  if (!userId) return;

  try {
    const { data } = await api.get(APIRoute.User.replace(':id', userId));
    return data;
  } catch (e) {
    const error = e as AxiosError<ApiError>;
    const response = error.response as AxiosResponse<ApiError>;
    return rejectWithValue(response.data);
  }
});
