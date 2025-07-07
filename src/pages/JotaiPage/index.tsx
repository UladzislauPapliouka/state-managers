import { BaseTodoPage } from '../BaseTodoPage';
import { atom, useAtom } from 'jotai';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '../../entities/Task';
import { Task } from '@/entities/Task/types.ts';
import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { useEffect } from 'react';
import { toaster } from '@/shared/ui/toaster';

// Simple atom
const todosAtom = atom<TaskType[]>([]);
//Simple atom
const filterAtom = atom<'all' | 'active' | 'completed'>('all');
// Simple atom
const isInitializedAtom = atom<boolean>(false);
const statusAtom = atom<'idle' | 'loading' | 'error' | 'success'>('idle');
// Simple atom
const abortControllerAtom = atom<AbortController | null>(null);

const addTaskAtom = atom(null, (get, set, taskName: string) => {
  const todos = get(todosAtom).concat({
    id: v1(),
    name: taskName,
    isDone: false
  });
  set(todosAtom, todos);
});

const deleteTaskAtom = atom(null, (get, set, taskId: string) => {
  const todos = get(todosAtom).filter((todo) => todo.id !== taskId);
  set(todosAtom, todos);
});

const doneTaskAtom = atom(null, (get, set, taskId: string) => {
  const todos = get(todosAtom).map((todo) =>
    todo.id === taskId ? { ...todo, isDone: !todo.isDone } : todo
  );
  set(todosAtom, todos);
});
const editTaskAtom = atom(
  null,
  (get, set, taskId: string, newTaskName: string) => {
    const todos = get(todosAtom).map((todo) =>
      todo.id === taskId ? { ...todo, name: newTaskName } : todo
    );
    set(todosAtom, todos);
  }
);

// Read only atom
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  return todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'active') {
      return !todo.isDone;
    }
    return todo.isDone;
  });
});

const filterTaskAtom = atom(null, (get, set, filter: string) => {
  set(filterAtom, filter as 'all' | 'active' | 'completed');
});

const reorderTaskAtom = atom(
  null,
  (
    get,
    set,
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => {
    set(todosAtom, (tasks) => {
      let finalTasks: Task[] = [];
      const currentTask = tasks.find((el) => el.id === currentTaskId) as Task;
      finalTasks = tasks.filter((el) => el.id !== currentTaskId);
      const overTaskIndex = finalTasks.findIndex((el) => el.id === overTaskId);
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
      return result;
    });
  }
);

export const JotaiPage = () => {
  const [tasks, setTodos] = useAtom(todosAtom);
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [abortController, setAbortController] = useAtom(abortControllerAtom);
  const [filteredTodos] = useAtom(filteredTodosAtom);
  const [filter] = useAtom(filterAtom);
  const [, filterTask] = useAtom(filterTaskAtom);
  const [, addTask] = useAtom(addTaskAtom);
  const [, deleteTask] = useAtom(deleteTaskAtom);
  const [, doneTask] = useAtom(doneTaskAtom);
  const [, editTask] = useAtom(editTaskAtom);
  const [, reorderTask] = useAtom(reorderTaskAtom);

  useEffect(() => {
    const newAbortController = new AbortController();
    const fetchTodos = async () => {
      const response = await dummyJsonApi.getTodos({
        signal: newAbortController.signal,
        userId: 1
      });
      const todos = response.map(convertTodoItemToTask);
      setTodos(todos);
      toaster.create({ type: 'success', title: 'Todos fetched' });
    };
    if (tasks.length === 0 && !isInitialized) {
      fetchTodos();
    }
    return () => {
      newAbortController.abort();
    };
  }, [
    tasks,
    setTodos,
    isInitialized,
    status,
    abortController,
    setIsInitialized,
    setStatus,
    setAbortController
  ]);
  useEffect(() => {
    if (status === 'success') {
      setIsInitialized(true);
    }
  }, [status, setIsInitialized]);
  return (
    <BaseTodoPage
      tasks={filteredTodos}
      onDelete={deleteTask}
      onAdd={addTask}
      onDone={doneTask}
      onTaskReorder={reorderTask}
      filterTask={filterTask}
      filter={filter}
      renderToDo={(task, onDelete, onDone, key) => (
        <TaskComponent
          task={task}
          onDelete={onDelete}
          onDone={onDone}
          onEdit={editTask}
          key={key}
        />
      )}
    />
  );
};
