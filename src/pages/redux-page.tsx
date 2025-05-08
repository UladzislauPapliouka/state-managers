import { useAppDispatch, useAppSelector } from '@/stores/redux';
import {
  addTask,
  deleteTask,
  toggleTaskStatus
} from '@/stores/redux/slices/todos.ts';
import { TodoPage } from './TodoPage.tsx';
import { Task } from '../entities/Task/Task.tsx';

export const ReduxPage = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const handleAddTask = (newTaskName: string) => {
    dispatch(addTask(newTaskName));
  };
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };
  const handleToggleTaskStatus = (taskId: string) => {
    dispatch(toggleTaskStatus(taskId));
  };
  return (
    <TodoPage
      tasks={tasks}
      onAdd={handleAddTask}
      onDelete={handleDeleteTask}
      onDone={handleToggleTaskStatus}
      renderToDo={(task, onDelete, onDone, key) => (
        <Task task={task} onDelete={onDelete} onDone={onDone} key={key} />
      )}
    />
  );
};
