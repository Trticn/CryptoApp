import { createSlice } from '@reduxjs/toolkit';

const transactionFormSlice = createSlice({
  name: 'CryptoTransactionForm',
  initialState: {
    title: '',
    quantity: '',
    description: '',
    date: '',
    type: '',
  },

  reducers: {
    changeTitle(state, action) {
      state.title = action.payload;
    },
    changeQuantity(state, action) {
      state.quantity = action.payload;
    },
    changeDescription(state, action) {
      state.description = action.payload;
    },
    changeDate(state, action) {
      state.date = action.payload;
    },

    changeType(state, action) {
      state.type = action.payload;
    },

    resetForm(state) {
      state.title = '';
      state.quantity = '';
      state.description = '';
      state.date = '';
      state.type = '';
    },
  },
});

export const {
  changeTitle,
  changeQuantity,
  changeCategory,
  changeDate,
  changeDescription,
  changeSource,
  changeType,
  resetForm,
} = transactionFormSlice.actions;

export const transactionFormReducer = transactionFormSlice.reducer;
