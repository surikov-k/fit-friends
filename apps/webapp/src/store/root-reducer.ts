import { combineReducers } from 'redux';
import { NameSpace } from '../app.constants';
import { userSlice } from './user-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
});
