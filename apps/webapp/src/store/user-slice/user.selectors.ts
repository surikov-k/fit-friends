import { State } from '../index';
import { NameSpace } from '../../app.constants';

export const getUserState = (state: State) => state[NameSpace.User];
export const getUserAvatar = (state: State) =>
  state[NameSpace.User].user.avatar;
export const getAuthStatus = (state: State) => state[NameSpace.User].authStatus;
export const getRegistrationStatus = (state: State) =>
  state[NameSpace.User].regStatus;
export const getAuthError = (state: State) => state[NameSpace.User].error;
