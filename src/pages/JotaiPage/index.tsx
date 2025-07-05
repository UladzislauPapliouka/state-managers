import { BaseTodoPage } from '../BaseTodoPage';
import { atom, useAtom } from 'jotai';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '../../entities/Task';
import { Task } from '@/entities/Task/types.ts';
import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { useEffect } from 'react';

const todosAtom = atom<TaskType[]>([]);
const abortControllerAtom = atom<AbortController>(new AbortController());
const fetchTodosAtom = atom(null, async (get, set) => {
  const abortController = get(abortControllerAtom);
  const response = await dummyJsonApi.getTodos({
    signal: abortController.signal
  });
  const todos = response.map(convertTodoItemToTask);
  set(todosAtom, todos);
});

export const JotaiPage = () => {
  const [tasks, setTodos] = useAtom(todosAtom);
  const [, fetchTodos] = useAtom(fetchTodosAtom);
  const [abortController] = useAtom(abortControllerAtom);
  const handleAddTask = (taskName: string) =>
    setTodos([...tasks, { id: v1(), name: taskName, isDone: false }]);
  const handelDeleteTask = (taskId: string) =>
    setTodos(tasks.filter(({ id }) => id !== taskId));
  const handleDone = (taskId: string) =>
    setTodos(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newTask = { ...task };
          newTask.isDone = !newTask.isDone;
          return newTask;
        }
        return task;
      })
    );
  const handleReorder = (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => {
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
    setTodos(result);
  };
  useEffect(() => {
    if (tasks.length === 0) {
      fetchTodos();
    }
    return () => {
      abortController.abort();
    };
  }, [tasks.length, fetchTodos, abortController]);
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
          key={key}
        />
      )}
    />
  );
};
