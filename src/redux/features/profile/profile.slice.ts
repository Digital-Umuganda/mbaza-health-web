import { initialState } from '@/interfaces/state.type';
import { User } from '@/interfaces/user.type';
import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from './profile.thunk';

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState<User>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
