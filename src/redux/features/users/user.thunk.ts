import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user.type';
import { ResponseError } from '@/interfaces/error.type';
import Http from '@/config/http';
import { PaginatedData, Params } from '@/interfaces/pagination';
import { ITEMS_PER_PAGE } from '@/constants/pagination';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ role, ...pagination }: Params<User>) => {
    try {
      let path = '/user';
      const { currentPage, itemsPerPage, search } = pagination;
      path += `?page=${currentPage || 1}&limit=${
        itemsPerPage || ITEMS_PER_PAGE[0]
      }${search ? `&search=${search}` : ''}`;

      if (role) {
        path += `&role=${role}`;
      }

      const { data } = await new Http().default.get<
        PaginatedData<User>
      >(path);
      return data;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (
    user: Pick<
      User,
      'email' | 'address' | 'name' | 'phone_number' | 'role'
    >,
  ) => {
    try {
      const { data } = await new Http().default.post(
        '/auth/new-user',
        user,
      );
      const newUser: User = data.user;
      return newUser;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
