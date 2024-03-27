import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IAnnotation,
  RatingResponse,
} from '@/interfaces/rating.type';
import { ResponseError } from '@/interfaces/error.type';
import Http from '@/config/http';
import { PaginatedData, Params } from '@/interfaces/pagination';
import { ITEMS_PER_PAGE } from '@/constants/pagination';

export const getRatings = createAsyncThunk(
  'ratings/getRatings',
  async ({ ...pagination }: Params<RatingResponse>) => {
    try {
      let path = '/ratings';
      const { currentPage, itemsPerPage, search, user_id, rating } =
        pagination;
      path += `?page=${currentPage || 1}&limit=${
        itemsPerPage || ITEMS_PER_PAGE[0]
      }${search ? `&search=${search}` : ''}${
        user_id ? `&user_id=${user_id}` : ''
      }`;

      if (rating) {
        path += `&rating=${rating}`;
      }

      const { data } = await new Http().default.get<
        PaginatedData<RatingResponse>
      >(path);
      return data;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const updateRating = createAsyncThunk(
  'ratings/updateRating',
  async (
    payload: {
      id: string;
    } & IAnnotation,
  ) => {
    try {
      const { id, ...rest } = payload;
      await new Http().default.put(`/ratings/${id}`, rest);
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
