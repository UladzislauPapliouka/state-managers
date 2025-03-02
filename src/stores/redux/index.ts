import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import TodoReducer from './slices/todos';

export const ReduxStore = configureStore({
  reducer: {
    tasks: TodoReducer
  }
});

type AppState = ReturnType<typeof ReduxStore.getState>;
type AppDispatch = typeof ReduxStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
