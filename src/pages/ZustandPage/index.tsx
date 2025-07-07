import { create } from 'zustand';
import { BaseTodoPage } from '../BaseTodoPage';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '@/entities/Task';
import { Task } from '@/entities/Task/types.ts';
import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { useEffect } from 'react';
import { toaster } from '@/shared/ui/toaster';

interface TodoStore {
  todos: TaskType[];
  isInitialized: boolean;
  hasError: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';
  addTodo: (newTaskName: string) => void;
  deleteTodo: (taskId: string) => void;
  toggleStatus: (taskId: string) => void;
  reorderTask: (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => void;
  editTodo: (taskId: string, newTaskName: string) => void;
  fetchTodos: () => Promise<void>;
  abortController: AbortController | null;
}

const useStore = create<TodoStore>()((set, get) => ({
  todos: [],
  isInitialized: false,
  hasError: false,
  status: 'idle',
  abortController: null,
  fetchTodos: async () => {
    const currentController = get().abortController;
    if (currentController) {
      currentController.abort();
    }

    const newController = new AbortController();
    set({ status: 'loading', hasError: false, abortController: newController });

    try {
      const todosData = await dummyJsonApi.getTodos({
        signal: newController.signal
      });
      const tasks = todosData.map(convertTodoItemToTask);
      set({
        todos: tasks,
        status: 'success',
        isInitialized: true,
        abortController: null
      });
      toaster.create({ type: 'success', title: 'Todos fetched' });
    } catch (error) {
      if (error instanceof Error && error.name === 'CanceledError') {
        return;
      }
      set({
        hasError: true,
        status: 'error',
        abortController: null
      });
      toaster.create({ type: 'error', title: 'Failed to fetch todos' });
    }
  },
  addTodo: (newTaskName) =>
    set((state) => ({
      todos: state.todos.concat([
        { id: v1(), name: newTaskName, isDone: false }
      ])
    })),
  deleteTodo: (taskId) =>
    set((state) => ({ todos: state.todos.filter(({ id }) => id !== taskId) })),
  toggleStatus: (taskId) =>
    set((state) => ({
      todos: state.todos.map((task) => {
        if (taskId === task.id) {
          const newTask = { ...task };
          newTask.isDone = !newTask.isDone;
          return newTask;
        }
        return task;
      })
    })),
  reorderTask: (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => {
    set((state) => {
      const currentTask = state.todos.find((el) => el.id === currentTaskId);
      if (!currentTask) return state;
      const finalTasks = state.todos.filter((el) => el.id !== currentTaskId);

      const overTaskIndex = finalTasks.findIndex((el) => el.id === overTaskId);

      const insertIndex =
        direction === 'up' ? overTaskIndex : overTaskIndex + 1;

      return {
        ...state,
        todos: state.todos
          .slice(0, insertIndex)
          .concat(currentTask)
          .concat(state.todos.slice(insertIndex, state.todos.length))
      };
    });
  },
  editTodo: (taskId, newTaskName) =>
    set((state) => ({
      todos: state.todos.map((task) =>
        task.id === taskId ? { ...task, name: newTaskName } : task
      )
    }))
}));

export const ZustandPage = () => {
  const todos = useStore((state) => state.todos);
  const isLoading = useStore((state) => state.status === 'loading');
  const {
    isInitialized,
    hasError,

    toggleStatus,
    addTodo,
    deleteTodo,
    reorderTask,
    editTodo,
    fetchTodos
  } = useStore((state) => state);

  useEffect(() => {
    if (!isInitialized) {
      fetchTodos();
    }
  }, [fetchTodos, isInitialized]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: Failed to fetch todos</div>;

  return (
    <BaseTodoPage
      tasks={todos}
      onAdd={addTodo}
      onDelete={deleteTodo}
      onDone={toggleStatus}
      onTaskReorder={reorderTask}
      renderToDo={(task, onDelete, onDone, key) => (
        <TaskComponent
          task={task}
          onEdit={editTodo}
          onDelete={onDelete}
          onDone={onDone}
          key={key}
        />
      )}
    />
  );
};
