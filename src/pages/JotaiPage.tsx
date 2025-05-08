import { Task } from '../shared/types';
import { TodoPage } from './TodoPage.tsx';
import { atom, useAtom } from 'jotai';
import { v1 } from 'uuid';
import { Task as TaskComponent } from '../entities/Task/Task.tsx';

const todosAtom = atom<Task[]>([]);
export const JotaiPage = () => {
  const [tasks, setTodos] = useAtom(todosAtom);
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
  return (
    <TodoPage
      tasks={tasks}
      onDelete={handelDeleteTask}
      onAdd={handleAddTask}
      onDone={handleDone}
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
