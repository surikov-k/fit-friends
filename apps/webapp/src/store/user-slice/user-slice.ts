import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../app.constants';
import { loginActions } from '../api-actions';
import { UserRole } from '@fit-friends/shared-types';

type LoggedUser = {
  email: string;

  name: string;
  role: UserRole;
  id: string;
};

const initialState: {
  authStatus: AuthorizationStatus;
  user: LoggedUser | null;
  error: string;
} = {
  authStatus: AuthorizationStatus.Unknown,
  user: null,
  error: '',
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, name, role, sub: id } = action.payload;
      state.user = { email, name, role, id };
      if (role === UserRole.Coach) {
        state.authStatus = AuthorizationStatus.Coach;
      }
      if (role === UserRole.Client) {
        state.authStatus = AuthorizationStatus.Client;
      }
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginActions.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(loginActions.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });
  },
});

export const { setUser } = userSlice.actions;
