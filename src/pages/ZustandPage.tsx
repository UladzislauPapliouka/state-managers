import { create } from 'zustand';
import { TodoPage } from './TodoPage.tsx';
import { v1 } from 'uuid';
import { Task } from '../shared/types';
import { Task as TaskComponent } from '@/entities/Task/Task.tsx';
interface TodoStore {
  todos: Task[];
  addTodo: (newTaskName: string) => void;
  deleteTodo: (taskId: string) => void;
  toggleStatus: (taskId: string) => void;
}
const useStore = create<TodoStore>()((set) => ({
  todos: [],
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
    }))
}));
export const ZustandPage = () => {
  const { todos, toggleStatus, addTodo, deleteTodo } = useStore(
    (state) => state
  );
  return (
    <TodoPage
      tasks={todos}
      onAdd={addTodo}
      onDelete={deleteTodo}
      onDone={toggleStatus}
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
