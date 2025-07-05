import { useAppDispatch, useAppSelector } from '@/pages/ReduxPage/stores/redux';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTask,
  reorderTask,
  fetchTodos
} from '@/pages/ReduxPage/stores/redux/slices/todos';
import { BaseTodoPage } from '../BaseTodoPage';
import { TaskComponent } from '@/entities/Task';
import { useEffect } from 'react';
import { toaster } from '@/shared/ui/toaster';

export const ReduxPage = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const status = useAppSelector((state) => state.tasks.status);
  const isInitialized = useAppSelector((state) => state.tasks.isInitialized);
  const hasError = useAppSelector((state) => state.tasks.hasError);
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
  const handleReorderTask = (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => {
    dispatch(
      reorderTask({
        direction,
        overTaskId,
        currentTaskId
      })
    );
  };

  useEffect(() => {
    if (!isInitialized) {
      const promise = dispatch(fetchTodos());
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, isInitialized]);
  useEffect(() => {
    if (isInitialized && status === 'succeeded') {
      toaster.create({ type: 'success', title: 'Todos fetched' });
    }
  }, [status, isInitialized]);

  // Обработка ошибок загрузки
  useEffect(() => {
    if (hasError && status === 'failed') {
      toaster.create({ type: 'error', title: 'Failed to fetch todos' });
    }
  }, [status, hasError]);
  return (
    <BaseTodoPage
      tasks={tasks}
      onAdd={handleAddTask}
      onDelete={handleDeleteTask}
      onDone={handleToggleTaskStatus}
      onTaskReorder={handleReorderTask}
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
