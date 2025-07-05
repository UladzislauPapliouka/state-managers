import { Task } from '@/entities/Task/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

interface TodoListState {
  tasks: Task[];
  hasError: boolean;
  isLoading: boolean;
}
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
    },
    editTask: (
      state,
      action: PayloadAction<{ taskId: string; newTaskName: string }>
    ) => {
      const newTasks = state.tasks.map((task) => {
        if (action.payload.taskId === task.id) {
          return { ...task, name: action.payload.newTaskName };
        }
        return task;
      });
      return { ...state, tasks: newTasks };
    },
    reorderTask: (
      state,
      action: PayloadAction<{
        currentTaskId: string;
        overTaskId: string;
        direction: 'up' | 'down';
      }>
    ) => {
      const tasks = state.tasks;
      let finalTasks: Task[] = [];
      const currentTask = tasks.find(
        (el) => el.id === action.payload.currentTaskId
      ) as Task;
      finalTasks = tasks.filter((el) => el.id !== action.payload.currentTaskId);
      console.log(finalTasks);
      const overTaskIndex = finalTasks.findIndex(
        (el) => el.id === action.payload.overTaskId
      );
      console.log(action.payload.direction);
      const result =
        action.payload.direction === 'up'
          ? finalTasks
              .slice(0, overTaskIndex)
              .concat(currentTask)
              .concat(finalTasks.slice(overTaskIndex, finalTasks.length))
          : finalTasks
              .slice(0, overTaskIndex + 1)
              .concat(currentTask)
              .concat(finalTasks.slice(overTaskIndex + 1));
      console.log(result);
      return { ...state, tasks: result };
    }
  }
});

export const { addTask, deleteTask, toggleTaskStatus, editTask, reorderTask } =
  TodosSlice.actions;
export default TodosSlice.reducer;
