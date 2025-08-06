import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  message: '',
  type: 'error', // 'success', 'error', 'info', 'warning'
  duration: 3000,
};

const nottificationSlice = createSlice({
  name: 'nottification',
  initialState,
  reducers: {
    showNottification: (state, action) => {
      const validTypes = ['success', 'error', 'info', 'warning'];
      const type = action.payload.type?.toLowerCase();
  
      
      state.show = true;
      state.message = action.payload.message;
      state.type = validTypes.includes(type) ? type : 'success'; // fallback na success
      state.duration = action.payload.duration || 3000;
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

