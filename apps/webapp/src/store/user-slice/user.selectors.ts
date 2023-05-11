import { State } from '../index';
import { NameSpace } from '../../app.constants';

export const getUserState = (state: State) => state[NameSpace.User];
export const getAuthStatus = (state: State) => state[NameSpace.User].authStatus;
export const getAuthError = (state: State) => state[NameSpace.User].error;
