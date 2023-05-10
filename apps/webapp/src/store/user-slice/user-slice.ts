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
  authStatus: string;
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
    saveUser: (state, action) => {
      const { email, name, role, sub: id } = action.payload;
      state.user = { email, name, role, id };
      console.log(state.user);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginActions.fulfilled, (state) => {
        state.error = '';
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginActions.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });
  },
});

export const { saveUser } = userSlice.actions;
