import { initialPaginatedState } from '@/interfaces/state.type';
import { User } from '@/interfaces/user.type';
import { createSlice } from '@reduxjs/toolkit';
import { getUsers, createUser } from './user.thunk';

const userSlice = createSlice({
  name: 'user',
  initialState: initialPaginatedState<User>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.data.unshift(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
