import { WorkoutInterface } from '@fit-friends/shared-types';
import { createSlice } from '@reduxjs/toolkit';
import { StateSlice } from '../../app.constants';
import { fetchWorkoutDetails, fetchWorkouts } from './workouts.api-acitons';

const initialState: {
  workouts: WorkoutInterface[];
  workoutDetails: WorkoutInterface | null;
  error: string;
  isLoading: boolean;
} = {
  workouts: [],
  workoutDetails: null,
  error: '',
  isLoading: false,
};

export const workoutsSlice = createSlice({
  name: StateSlice.Workouts,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWorkouts.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchWorkoutDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkoutDetails.fulfilled, (state, action) => {
        state.workoutDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWorkoutDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
