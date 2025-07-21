import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.initialized = true;
    },
    setUserLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const { setCredentials, setUserLogout, setInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
