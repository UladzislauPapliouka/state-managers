import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListState } from '../../../shared/types';
import { v1 } from 'uuid';

const initialState: TodoListState = {
  tasks: [],
  hasError: false,
  isLoading: false
};
export const TodosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: v1(),
            name: action.payload,
            isDone: false
          }
        ]
      };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== action.payload)
      };
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.map((task) => {
        if (action.payload === task.id) {
          const newTask = { ...task };
          newTask.isDone = !newTask.isDone;

          return newTask;
        }
        return task;
      });

      return { ...state, tasks: newTasks };
    }
  }
});

export const { addTask, deleteTask, toggleTaskStatus } = TodosSlice.actions;
export default TodosSlice.reducer;
