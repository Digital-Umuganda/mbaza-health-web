import { initialPaginatedState } from '@/interfaces/state.type';
import { RatingResponse } from '@/interfaces/rating.type';
import { createSlice } from '@reduxjs/toolkit';
import { getRatings } from './rating.thunk';

const ratingSlice = createSlice({
  name: 'rating',
  initialState: initialPaginatedState<RatingResponse>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRatings.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRatings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getRatings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default ratingSlice.reducer;