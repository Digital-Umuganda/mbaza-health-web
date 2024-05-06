import { initialState } from '@/interfaces/state.type';
import { IBetterResponse } from './../../../interfaces/better-response';
import { provideBetterResponse } from './better-response.thunk';
import { createSlice } from '@reduxjs/toolkit';

const betterResponseSlice = createSlice({
  name: 'questionAnswer',
  initialState: initialState<
    IBetterResponse & { messageId: string }
  >(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(provideBetterResponse.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      provideBetterResponse.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      provideBetterResponse.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    );
  },
});

export default betterResponseSlice.reducer;
