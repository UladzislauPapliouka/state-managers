import { create } from 'zustand';
import { BaseTodoPage } from '../BaseTodoPage';
import { v1 } from 'uuid';
import { TaskComponent, TaskType } from '@/entities/Task';
interface TodoStore {
  todos: TaskType[];
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
    <BaseTodoPage
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
