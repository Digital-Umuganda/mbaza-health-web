import { initialState } from '@/interfaces/state.type';
import { User } from '@/interfaces/user.type';
import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  forgotPassword,
  resetPassword,
  logout,
  updateProfile,
  changePassword,
} from './auth.thunk';

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
    builder.addCase(forgotPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(resetPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.pending, state => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.data = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(changePassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { onLogout } = authSlice.actions;

export default authSlice.reducer;
