import Http from '@/config/http';
import { ResponseError } from '@/interfaces/error.type';
import { User } from '@/interfaces/user.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProfile = createAsyncThunk(
  'users/getProfile',
  async () => {
    try {
      const { data } = await new Http().default.get<User>(
        '/user/profile',
      );
      return data;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
