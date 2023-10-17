import { initialState } from '@/interfaces/state.type';
import { IChat } from '@/interfaces/question.answer.type';
import { createSlice } from '@reduxjs/toolkit';
import { getRandomChat } from './question.answer.thunk';

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState<IChat>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRandomChat.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRandomChat.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getRandomChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default chatSlice.reducer;
