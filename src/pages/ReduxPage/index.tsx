import { useAppDispatch, useAppSelector } from '@/pages/ReduxPage/stores/redux';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTask
} from '@/pages/ReduxPage/stores/redux/slices/todos';
import { BaseTodoPage } from '../BaseTodoPage';
import { TaskComponent } from '@/entities/Task';

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
  const handleEditTask = (taskId: string, newTaskName: string) => {
    dispatch(editTask({ taskId, newTaskName }));
  };
  return (
    <BaseTodoPage
      tasks={tasks}
      onAdd={handleAddTask}
      onDelete={handleDeleteTask}
      onDone={handleToggleTaskStatus}
      renderToDo={(task, onDelete, onDone, key) => (
        <TaskComponent
          task={task}
          onDelete={onDelete}
          onDone={onDone}
          onEdit={handleEditTask}
          key={key}
        />
      )}
    />
  );
};
