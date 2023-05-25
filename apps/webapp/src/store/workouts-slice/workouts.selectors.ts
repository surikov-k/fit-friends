import { State } from '../index';
import { StateSlice } from '../../app.constants';

export const getWorkoutState = (state: State) => state[StateSlice.Workouts];

export const getWorkoutsList = (state: State) =>
  state[StateSlice.Workouts].workouts;

export const getWorkoutDetails = (state: State) =>
  state[StateSlice.Workouts].workoutDetails;

export const getWorkoutsLoading = (state: State) =>
  state[StateSlice.Workouts].isLoading;
