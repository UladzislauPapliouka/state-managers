import { useAppDispatch, useAppSelector } from '@/pages/ReduxPage/stores/redux';
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  editTask,
  reorderTask
} from '@/pages/ReduxPage/stores/redux/slices/tasks';
import { BaseTodoPage } from '../BaseTodoPage';
import { TaskComponent } from '@/entities/Task';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toaster } from '@/shared/ui/toaster';
import { useAuthContext } from '@/features/AuthContext';
import { fetchTodos } from './stores/redux/slices/thunk';

export const ReduxPage = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const status = useAppSelector((state) => state.tasks.status);
  const isInitialized = useAppSelector((state) => state.tasks.isInitialized);
  const hasError = useAppSelector((state) => state.tasks.hasError);
  const [filter, setFilter] = useState<string>('all');
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'all') {
        return true;
      }
      if (filter === 'active') {
        return !task.isDone;
      }
      return task.isDone;
    });
  }, [tasks, filter]);
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();

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
  const filterTask = useCallback((filter: string) => {
    setFilter(filter);
  }, []);

  useEffect(() => {
    if (!isInitialized && user) {
      const promise = dispatch(fetchTodos({ userId: user!.id }));
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, isInitialized, user]);

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
      tasks={filteredTasks}
      onAdd={handleAddTask}
      onDelete={handleDeleteTask}
      onDone={handleToggleTaskStatus}
      onTaskReorder={handleReorderTask}
      filterTask={filterTask}
      filter={filter}
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
