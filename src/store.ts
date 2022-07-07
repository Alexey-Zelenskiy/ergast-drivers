import {
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { driversReducer } from './modules/reducers/driver';

const rootReducer = {
  drivers: driversReducer
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type DispatchType = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
