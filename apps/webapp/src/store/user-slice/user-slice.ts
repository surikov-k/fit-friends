import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, StateSlice } from '../../app.constants';
import { JwtPayload, UserInterface, UserRole } from '@fit-friends/shared-types';
import {
  checkAuth,
  fetchUserInfo,
  loginAction,
  logoutAction,
  registerUserAction,
  saveClientProfileAction,
  saveCoachProfileAction,
  updateUserProfileAction,
} from './user.api-actions';
import { getAccessToken } from '../../services/tokens';
import jwtDecode from 'jwt-decode';

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
  userInfo: UserInterface | null;
  isLoading: boolean;
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
  userInfo: null,
  error: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: StateSlice.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.error = '';

        const { avatar, email, name, role, sub: id } = action.payload;
        state.user = { avatar, email, name, role, id };
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
      .addCase(updateUserProfileAction.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateUserProfileAction.fulfilled, (state, action) => {
        state.error = '';
        state.userInfo = action.payload;
        state.isLoading = false;
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

        const { avatar, email, name, role, sub: id } = action.payload;
        state.user = { avatar, email, name, role, id };
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

    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        const {
          email,
          name,
          role,
          sub: id,
        } = jwtDecode<JwtPayload>(getAccessToken());
        state.user = { email, name, role, id };
        state.authStatus = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });

    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
