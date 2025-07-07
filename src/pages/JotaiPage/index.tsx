import { BaseTodoPage } from '../BaseTodoPage';
import { atom, useAtom } from 'jotai';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '../../entities/Task';
import { Task } from '@/entities/Task/types.ts';
import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { useCallback, useEffect } from 'react';
import { toaster } from '@/shared/ui/toaster';

const todosAtom = atom<TaskType[]>([]);
const isInitializedAtom = atom<boolean>(false);
const statusAtom = atom<'idle' | 'loading' | 'error' | 'success'>('idle');
const abortControllerAtom = atom<AbortController | null>(null);

export const JotaiPage = () => {
  const [tasks, setTodos] = useAtom(todosAtom);
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [abortController, setAbortController] = useAtom(abortControllerAtom);

  const handleAddTask = useCallback(
    (taskName: string) =>
      setTodos((tasks) => [
        ...tasks,
        { id: v1(), name: taskName, isDone: false }
      ]),
    [setTodos]
  );
  const handelDeleteTask = useCallback(
    (taskId: string) =>
      setTodos((tasks) => tasks.filter(({ id }) => id !== taskId)),
    [setTodos]
  );
  const handleDone = useCallback(
    (taskId: string) =>
      setTodos((tasks) =>
        tasks.map((task) => {
          if (task.id === taskId) {
            const newTask = { ...task };
            newTask.isDone = !newTask.isDone;
            return newTask;
          }
          return task;
        })
      ),
    [setTodos]
  );
  const handleReorder = useCallback(
    (currentTaskId: string, overTaskId: string, direction: 'up' | 'down') => {
      setTodos((tasks) => {
        let finalTasks: Task[] = [];
        const currentTask = tasks.find((el) => el.id === currentTaskId) as Task;
        finalTasks = tasks.filter((el) => el.id !== currentTaskId);
        console.log(finalTasks);
        const overTaskIndex = finalTasks.findIndex(
          (el) => el.id === overTaskId
        );
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
        return result;
      });
    },
    [setTodos]
  );
  const handleEditTask = useCallback(
    (taskId: string, newTaskName: string) => {
      setTodos((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, name: newTaskName } : task
        )
      );
    },
    [setTodos]
  );
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
      tasks={tasks}
      onDelete={handelDeleteTask}
      onAdd={handleAddTask}
      onDone={handleDone}
      onTaskReorder={handleReorder}
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
