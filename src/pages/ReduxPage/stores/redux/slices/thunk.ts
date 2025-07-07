import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ userId }: { userId: number }, { signal }) => {
    const response = await dummyJsonApi.getTodos({
      userId,
      signal: signal
    });
    return response.map(convertTodoItemToTask);
  }
);
