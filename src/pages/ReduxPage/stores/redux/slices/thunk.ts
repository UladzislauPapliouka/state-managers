import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { signal }) => {
    const response = await dummyJsonApi.getTodos({
      signal: signal
    });
    return response.map(convertTodoItemToTask);
  }
);
