import { initialState } from '@/interfaces/state.type';
import { User } from '@/interfaces/user.type';
import { createSlice } from '@reduxjs/toolkit';
import { login } from './auth.thunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState<User | null>(),
  reducers: {
    onLogout: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = null;
    });
  },
});

export const { onLogout } = authSlice.actions;

export default authSlice.reducer;
