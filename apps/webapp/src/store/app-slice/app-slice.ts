import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../app.constants';

const initialState = {
  user: null,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
});

// export const { saveUser } = appSlice.actions;
