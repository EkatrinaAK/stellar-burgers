import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './slice/userSlice';
import { ingredientsSlice } from './slice/ingredientsSlice';
import { constructorSlice } from './slice/constructorSlice';
import { orderSlice } from './slice/orderSlice';

//const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
