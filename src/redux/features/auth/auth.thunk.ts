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
    if (!username.includes('@')) {
      if (username.startsWith('+')) {
        username = username.substring(1);
      }
      if (!username.startsWith('25')) {
        username = '25' + username;
      }
    }
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
      const field = username.includes('@') ? 'email' : 'phone';
      if (field !== 'email') {
        if (username.startsWith('+')) {
          username = username.substring(1);
        }
        if (!username.startsWith('25')) {
          username = '25' + username;
        }
      }
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
      const field = username.includes('@') ? 'email' : 'phone';
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

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    new Http().default.post('/auth/logout');
  } catch (error) {
    // eslint-disable-next-line no-console
  } finally {
    Secure.remove(Keys.USER_INFO);
    Secure.removeToken();
    window.location.href = '/';
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>) => {
    try {
      await new Http().default.put<User>(
        '/user/update-profile',
        data,
      );
      const previous = Secure.getProfile();
      const newProfile = {
        ...previous,
        ...data,
      };
      Secure.set(Keys.USER_INFO, newProfile);
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await new Http().default.put<User>('/user/change-password', {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async ({
    username,
    verification_code,
  }: {
    username: string;
    verification_code: string;
  }) => {
    try {
      const field = username.includes('@') ? 'email' : 'phone';

      if (field !== 'email') {
        if (username.startsWith('+')) {
          username = username.substring(1);
        }
        if (!username.startsWith('25')) {
          username = '25' + username;
        }
      }

      const { data } = await new Http().default.post(
        `/auth/verify-user/${username}/code/${verification_code}?field=${field}`,
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
