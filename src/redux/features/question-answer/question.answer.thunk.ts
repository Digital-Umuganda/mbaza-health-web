import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IChat,
  QuestionAnswer,
} from '@/interfaces/question.answer.type';
import { ResponseError } from '@/interfaces/error.type';
import Http from '@/config/http';
import { IAnnotation } from '@/interfaces/rating.type';

export const getRandomQuestion = createAsyncThunk(
  'questionAnswer/getRandomQuestion',
  async (id: string | null) => {
    try {
      let url = '/messages/random';
      if (id) {
        url += `?message_id=${id}`;
      }
      const { data } = await new Http().default.get<QuestionAnswer>(
        url,
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
  async (
    payload: {
      messageId: string;
    } & IAnnotation,
  ) => {
    try {
      const { messageId, ...rest } = payload;
      await new Http().default.post(
        `/messages/${messageId}/ratings`,
        rest,
      );
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
