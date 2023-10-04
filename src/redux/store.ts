import {
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import errorMiddleware from '../config/error-middleware';
import loggerMiddleware from '../config/logger-middleware';
import authSlice from './features/auth/auth.slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'payload.config',
          'payload.request',
          'error',
          'meta.arg',
        ],
      },
    }).concat(
      errorMiddleware,
      loadingBarMiddleware(),
      loggerMiddleware,
    );
  },
});

const getStore = () => {
  return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> =
  useSelector;
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  AnyAction
>;

export default getStore;