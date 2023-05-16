import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../app.constants';
import { UserRole } from '@fit-friends/shared-types';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  registerUserAction,
  saveClientProfileAction,
  saveCoachProfileAction,
  uploadAvatarAction,
} from './user.api-actions';

type LoggedUser = {
  email: string;
  avatar?: string;
  name: string;
  role: UserRole | null;
  id: string;
};

const initialState: {
  authStatus: AuthorizationStatus;
  regStatus: UserRole | null;
  user: LoggedUser;
  error: string;
} = {
  authStatus: AuthorizationStatus.Unknown,
  regStatus: null,
  user: {
    email: '',
    avatar: '',
    name: '',
    role: null,
    id: '',
  },
  error: '',
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.error = '';

        const { email, name, role, sub: id } = action.payload;
        state.user = { email, name, role, id };
        state.regStatus = role;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });

    builder
      .addCase(saveCoachProfileAction.fulfilled, (state) => {
        state.error = '';
        state.authStatus = AuthorizationStatus.Coach;
      })
      .addCase(saveCoachProfileAction.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });

    builder
      .addCase(saveClientProfileAction.fulfilled, (state) => {
        state.error = '';
        state.authStatus = AuthorizationStatus.Client;
      })
      .addCase(saveClientProfileAction.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });

    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.error = '';

        const { email, name, role, sub: id } = action.payload;
        state.user = { email, name, role, id };
        if (role === UserRole.Coach) {
          state.authStatus = AuthorizationStatus.Coach;
        }
        if (role === UserRole.Client) {
          state.authStatus = AuthorizationStatus.Client;
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : '';
      });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.authStatus = AuthorizationStatus.NoAuth;
    });

    builder.addCase(uploadAvatarAction.fulfilled, (state, action) => {
      state.user.avatar = action.payload;
    });

    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authStatus = action.payload;
    });
  },
});
