import { combineReducers } from 'redux';
import { StateSlice } from '../app.constants';
import { userSlice } from './user-slice';

export const rootReducer = combineReducers({
  [StateSlice.User]: userSlice.reducer,
});
