import { combineReducers } from 'redux';
import { StateSlice } from '../app.constants';
import { userSlice } from './user-slice';
import { workoutsSlice } from './workouts-slice';

export const rootReducer = combineReducers({
  [StateSlice.User]: userSlice.reducer,
  [StateSlice.Workouts]: workoutsSlice.reducer,
});
