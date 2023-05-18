import { State } from '../index';
import { StateSlice } from '../../app.constants';

export const getUserState = (state: State) => state[StateSlice.User];
export const getUserAvatar = (state: State) =>
  state[StateSlice.User].user.avatar;
export const getAuthStatus = (state: State) =>
  state[StateSlice.User].authStatus;
export const getRegistrationStatus = (state: State) =>
  state[StateSlice.User].regStatus;
export const getAuthError = (state: State) => state[StateSlice.User].error;
export const getCurrentUserId = (state: State) =>
  state[StateSlice.User].user.id;
export const getCurrentUser = (state: State) => state[StateSlice.User].user;
export const getIsUserLoading = (state: State) =>
  state[StateSlice.User].isLoading;
export const getUserInfo = (state: State) => state[StateSlice.User].userInfo;
