import { BaseTodoPage } from '../BaseTodoPage';
import { atom, useAtom } from 'jotai';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '../../entities/Task';

const todosAtom = atom<TaskType[]>([]);
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
    <BaseTodoPage
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
