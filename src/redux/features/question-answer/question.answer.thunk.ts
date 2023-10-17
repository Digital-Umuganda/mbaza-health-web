import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IChat,
  QuestionAnswer,
} from '@/interfaces/question.answer.type';
import { ResponseError } from '@/interfaces/error.type';
import Http from '@/config/http';
import { Rate } from '@/interfaces/rating.type';

export const getRandomQuestion = createAsyncThunk(
  'questionAnswer/getRandomQuestion',
  async () => {
    try {
      const { data } = await new Http().default.get<QuestionAnswer>(
        '/messages/random',
      );
      return data;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const getRandomChat = createAsyncThunk(
  'questionAnswer/getRandomChat',
  async (id: string | null) => {
    try {
      let url = '/messages/random';
      if (id) {
        url += `?message_id=${id}`;
      }
      const { data } = await new Http().default.get<IChat>(url);
      return data;
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);

export const annotate = createAsyncThunk(
  'questionAnswer/annotate',
  async (payload: {
    messageId: string;
    rating: Rate;
    comment: string;
  }) => {
    try {
      await new Http().default.post(
        `/messages/${payload.messageId}/ratings`,
        {
          rating: payload.rating,
          comment: payload.comment,
        },
      );
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
