import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types';
import { v1 } from 'uuid';

const initialState: Task[] = [];
export const TodosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Task = {
        id: v1(),
        name: action.payload,
        isDone: false
      };
      return [...state, newTodo];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter(({ id }) => id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const newTasks = state.map((task) => {
        if (action.payload === task.id) {
          const newTask = { ...task };
          newTask.isDone = !newTask.isDone;

          return newTask;
        }
        return task;
      });

      return newTasks;
    }
  }
});

export const { addTodo, deleteTodo, toggleStatus } = TodosSlice.actions;
export default TodosSlice.reducer;
