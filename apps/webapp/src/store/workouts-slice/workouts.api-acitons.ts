import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { ApiError, WorkoutInterface } from '@fit-friends/shared-types';
import { AppDispatch, Extra, State } from '../index';
import { APIRoute } from '../../app.constants';

export const fetchWorkouts = createAsyncThunk<
  WorkoutInterface[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
  }
>('workouts/fetchWorkouts', async (_, { extra: { api }, rejectWithValue }) => {
  try {
    const { data } = await api.get(APIRoute.Workouts);
    return data;
  } catch (e) {
    const error = e as AxiosError<ApiError>;
    const response = error.response as AxiosResponse<ApiError>;
    return rejectWithValue(response.data);
  }
});

export const fetchWorkoutDetails = createAsyncThunk<
  WorkoutInterface,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Extra;
  }
>(
  'workouts/fetchWorkoutDetails',
  async (id, { extra: { api }, rejectWithValue }) => {
    try {
      const { data } = await api.get(APIRoute.Workouts + `/${id}`);
      return data;
    } catch (e) {
      const error = e as AxiosError<ApiError>;
      const response = error.response as AxiosResponse<ApiError>;
      return rejectWithValue(response.data);
    }
  }
);
