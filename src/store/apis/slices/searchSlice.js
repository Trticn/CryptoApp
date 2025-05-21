// store/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  debouncedQuery: '',
  showResults: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeQuery(state, action) {
      state.query = action.payload;
    },
    changeDebouncedQuery(state, action) {
      state.debouncedQuery = action.payload;
    },
    changeShowResults(state, action) {
      state.showResults = action.payload;
    },
    clearSearch(state) {
      state.query = '';
      state.debouncedQuery = '';
      state.showResults = false;
    },
  },
});

export const { changeQuery, changeDebouncedQuery, changeShowResults, clearSearch } =
  searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;
