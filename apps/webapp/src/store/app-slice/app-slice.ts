import { createSlice } from '@reduxjs/toolkit';
import { StateSlice } from '../../app.constants';

const initialState = {
  user: null,
};

export const appSlice = createSlice({
  name: StateSlice.App,
  initialState,
  reducers: {},
});

// export const { saveUser } = appSlice.actions;
