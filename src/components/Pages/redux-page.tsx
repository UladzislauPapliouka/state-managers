import { useAppDispatch, useAppSelector } from '@/stores/redux';
import { addTodo, deleteTodo, toggleStatus } from '@/stores/redux/slices/todos';
import { TodoPage } from './TodoPage';
import { Task } from '../Task';

export const ReduxPage = () => {
  const tasks = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const handleAddTask = (newTaskName: string) => {
    dispatch(addTodo(newTaskName));
  };
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTodo(taskId));
  };
  const handleToggleTaskStatus = (taskId: string) => {
    dispatch(toggleStatus(taskId));
  };
  return (
    <TodoPage
      tasks={tasks}
      onAdd={handleAddTask}
      onDelete={handleDeleteTask}
      onDone={handleToggleTaskStatus}
      renderToDo={(task, onDelete, onDone, key) => (
        <Task task={task} onDelete={onDelete} onDone={onDone} key={key} />
      )}
    />
  );
};
