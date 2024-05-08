import Http from '@/config/http';
import { IBetterResponse } from '@/interfaces/better-response';
import { ResponseError } from '@/interfaces/error.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const provideBetterResponse = createAsyncThunk(
  'betterResponse/provideBetterResponse',
  async ({
    messageId,
    betterResponse,
  }: {
    betterResponse: IBetterResponse;
    messageId: string;
  }) => {
    try {
      await new Http().default.patch(
        `/conversations/${messageId}`,
        betterResponse,
      );
      return { messageId, betterResponse };
    } catch (error) {
      const err = error as ResponseError;
      const message = err.response?.data.message || err.message;
      throw new Error(message);
    }
  },
);
