import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  message: '',
  type: 'info', // 'success', 'error', 'info', 'warning'
  duration: 3000,
};

const nottificationSlice = createSlice({
  name: 'nottification',
  initialState,
  reducers: {
    showNottification: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
      state.duration = typeof action.payload.duration === 'number' ? action.payload.duration : 3000;
    },
    hideNottification: (state) => {
      state.show = false;
      state.message = '';
      state.type = 'info';
      state.duration = 3000;
    },
  },
});

export const { showNottification, hideNottification } = nottificationSlice.actions;
export const nottificationReducer = nottificationSlice.reducer;

