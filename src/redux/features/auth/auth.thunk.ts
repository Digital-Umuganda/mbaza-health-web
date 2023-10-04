import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, allowedRoles } from '@/interfaces/user.type';
import Secure from '@/helpers/secureLS';
import Keys from '@/constants/keys';
import { ResponseError } from '@/interfaces/error.type';
import Http from '@/config/http';

const getAuthData = async (token: string) => {
  const { data: authData } = await new Http(token).default.get<User>(
    '/user/profile',
  );

  if (!allowedRoles.includes(authData.role)) {
    throw new Error('You are not allowed to access this app');
  }

  Secure.set(Keys.USER_INFO, authData);

  Secure.setToken(authData.token);

  return authData;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await new Http().default.post('/auth/login', {
        username,
        password,
      });
      const { access_token: token } = response.data;

      const authData = await getAuthData(token);

      return authData;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (username: string) => {
    try {
      const field = username.includes('@') ? 'email' : 'username';
      await new Http().default.post(
        `/auth/send-code/${username}?field=${field}`,
      );
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({
    username,
    password,
    verification_code,
  }: {
    username: string;
    password: string;
    verification_code: string;
  }) => {
    try {
      const field = username.includes('@') ? 'email' : 'username';
      const { data } = await new Http().default.post(
        `/auth/reset-password/${username}?field=${field}`,
        {
          password,
          verification_code,
        },
      );
      const authData = await getAuthData(data.access_token);
      return authData;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
