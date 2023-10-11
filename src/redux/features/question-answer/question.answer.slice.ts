import { initialState } from '@/interfaces/state.type';
import { QuestionAnswer } from '@/interfaces/question.answer.type';
import { createSlice } from '@reduxjs/toolkit';
import { getRandomQuestion, annotate } from './question.answer.thunk';

const questionAnswerSlice = createSlice({
  name: 'questionAnswer',
  initialState: initialState<QuestionAnswer>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRandomQuestion.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRandomQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getRandomQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(annotate.pending, state => {
      state.loading = true;
    });
    builder.addCase(annotate.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(annotate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default questionAnswerSlice.reducer;
