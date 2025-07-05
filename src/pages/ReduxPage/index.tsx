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
    if (tasks.length === 0) {
      dispatch(fetchTodos());
    }
  }, [dispatch, tasks.length]);

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
