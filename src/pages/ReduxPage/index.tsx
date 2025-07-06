import { useAppDispatch, useAppSelector } from '@/pages/ReduxPage/stores/redux';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTask,
  reorderTask
} from '@/pages/ReduxPage/stores/redux/slices/todos';
import { BaseTodoPage } from '../BaseTodoPage';
import { TaskComponent } from '@/entities/Task';
import { useCallback, useEffect } from 'react';
import { toaster } from '@/shared/ui/toaster';

export const ReduxPage = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const status = useAppSelector((state) => state.tasks.status);
  const isInitialized = useAppSelector((state) => state.tasks.isInitialized);
  const hasError = useAppSelector((state) => state.tasks.hasError);
  const dispatch = useAppDispatch();

  const handleAddTask = useCallback(
    (newTaskName: string) => {
      dispatch(addTask(newTaskName));
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTask(taskId));
    },
    [dispatch]
  );

  const handleToggleTaskStatus = useCallback(
    (taskId: string) => {
      dispatch(toggleTaskStatus(taskId));
    },
    [dispatch]
  );

  const handleEditTask = useCallback(
    (taskId: string, newTaskName: string) => {
      dispatch(editTask({ taskId, newTaskName }));
    },
    [dispatch]
  );

  const handleReorderTask = useCallback(
    (currentTaskId: string, overTaskId: string, direction: 'up' | 'down') => {
      dispatch(
        reorderTask({
          direction,
          overTaskId,
          currentTaskId
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isInitialized) {
      // const promise = dispatch(fetchTodos());
      return () => {
        // promise.abort();
      };
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (status === 'succeeded') {
        toaster.create({ type: 'success', title: 'Todos fetched' });
      }
      if (status === 'failed') {
        toaster.create({ type: 'error', title: 'Failed to fetch todos' });
      }
    }
  }, [status, isInitialized, hasError]);

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
