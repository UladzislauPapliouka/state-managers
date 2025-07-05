import { create } from 'zustand';
import { BaseTodoPage } from '../BaseTodoPage';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '@/entities/Task';
import { Task } from '@/entities/Task/types.ts';
import {
  convertTodoItemToTask,
  dummyJsonApi,
  TodoItem
} from '@/features/TodoList/api';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toaster } from '@/shared/ui/toaster';

interface TodoStore {
  todos: TaskType[];
  initTodos: (tasks: TaskType[]) => void;
  addTodo: (newTaskName: string) => void;
  deleteTodo: (taskId: string) => void;
  toggleStatus: (taskId: string) => void;
  reorderTask: (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => void;
}
const useStore = create<TodoStore>()((set, get) => ({
  todos: [],
  initTodos: (tasks: TaskType[]) => {
    set({ todos: tasks });
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
    const tasks = get().todos;
    let finalTasks: Task[] = [];
    const currentTask = tasks.find((el) => el.id === currentTaskId) as Task;
    finalTasks = tasks.filter((el) => el.id !== currentTaskId);
    console.log(finalTasks);
    const overTaskIndex = finalTasks.findIndex((el) => el.id === overTaskId);
    console.log(direction);
    const result =
      direction === 'up'
        ? finalTasks
            .slice(0, overTaskIndex)
            .concat(currentTask)
            .concat(finalTasks.slice(overTaskIndex, finalTasks.length))
        : finalTasks
            .slice(0, overTaskIndex + 1)
            .concat(currentTask)
            .concat(finalTasks.slice(overTaskIndex + 1));
    console.log(result);
    set((state) => ({ ...state, todos: result }));
  }
}));
export const ZustandPage = () => {
  const { todos, toggleStatus, addTodo, deleteTodo, reorderTask, initTodos } =
    useStore((state) => state);
  const { data, isLoading } = useQuery<TodoItem[]>({
    queryKey: ['todos'],
    queryFn: dummyJsonApi.getTodos,
    enabled: todos.length === 0
  });
  useEffect(() => {
    if (todos.length === 0 && !isLoading) {
      initTodos(data?.map(convertTodoItemToTask) || []);
      toaster.create({ type: 'success', title: 'Todos fetched' });
    }
  }, [data, todos, initTodos, isLoading]);
  if (isLoading) return <div>Loading...</div>;
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
          onDelete={onDelete}
          onDone={onDone}
          key={key}
        />
      )}
    />
  );
};
