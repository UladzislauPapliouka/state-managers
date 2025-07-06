import { Task } from '@/entities/Task/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { fetchTodos } from './thunk';

interface TodoListState {
  tasks: Task[];
  hasError: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isInitialized: boolean;
}

const initialState: TodoListState = {
  tasks: [],
  hasError: false,
  status: 'idle',
  isInitialized: false
};

export const TodosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: v1(),
        name: action.payload,
        isDone: false
      };

      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(({ id }) => id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(({ id }) => id === action.payload);
      if (!task) return state;
      task.isDone = !task.isDone;
    },
    editTask: (
      state,
      action: PayloadAction<{ taskId: string; newTaskName: string }>
    ) => {
      const task = state.tasks.find(({ id }) => id === action.payload.taskId);
      if (!task) return state;
      task.name = action.payload.newTaskName;
    },
    reorderTask: (
      state,
      action: PayloadAction<{
        currentTaskId: string;
        overTaskId: string;
        direction: 'up' | 'down';
      }>
    ) => {
      const currentTask = state.tasks.find(
        (el) => el.id === action.payload.currentTaskId
      );
      if (!currentTask) return state;

      const finalTasks = state.tasks.filter(
        (el) => el.id !== action.payload.currentTaskId
      );

      const overTaskIndex = finalTasks.findIndex(
        (el) => el.id === action.payload.overTaskId
      );

      const insertIndex =
        action.payload.direction === 'up' ? overTaskIndex : overTaskIndex + 1;

      state.tasks = finalTasks
        .slice(0, insertIndex)
        .concat(currentTask)
        .concat(finalTasks.slice(insertIndex, finalTasks.length));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
        state.hasError = false;
        state.isInitialized = true;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.hasError = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        if (action.meta.aborted) {
          return state;
        }
        state.isInitialized = true;
        state.status = 'failed';
        state.hasError = true;
      });
  }
});

export const { addTask, deleteTask, toggleTaskStatus, editTask, reorderTask } =
  TodosSlice.actions;
export default TodosSlice.reducer;
