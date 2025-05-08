import { makeObservable, observable, action } from 'mobx';
import { v1 } from 'uuid';
import { TodoPage } from './TodoPage.tsx';
import { observer } from 'mobx-react-lite';
import { Task as TaskComponent } from '@/entities/Task/Task.tsx';
import { Task as TaskType } from '../shared/types';
class Task {
  id: string = v1();
  name: string;
  isDone: boolean = false;

  constructor(name: string) {
    makeObservable(this, {
      name: observable,
      isDone: observable,
      toggleStatus: action
    });
    console.log(`new task name: ${name}`);

    this.name = name;
  }

  toggleStatus() {
    this.isDone = !this.isDone;
  }
}

export class Todos {
  todos: Task[] = [];
  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      deleteTodo: action,
      toggleStatus: action
    });
  }
  addTodo = (taskName: string) => {
    const newTodo = new Task(taskName);

    this.todos.push(newTodo);
    return newTodo;
  };
  deleteTodo = (taskId: string) => {
    this.todos = this.todos.filter(({ id }) => id !== taskId);
  };
  toggleStatus = (taskId: string) => {
    this.todos.forEach((task) => {
      if (taskId === task.id) {
        task.toggleStatus();
      }
    });
  };
}
const ObservableTask = observer(
  ({
    task,
    onDelete,
    onDone,
    key
  }: {
    task: TaskType;
    onDelete: (id: string) => void;
    onDone: (id: string) => void;
    key: string;
  }) => (
    <TaskComponent
      onDelete={onDelete}
      onDone={onDone}
      key={key}
      task={{ id: task.id, name: task.name, isDone: task.isDone }}
    />
  )
);
export const MobXPage = observer(({ store }: { store: Todos }) => {
  console.log(store.todos);

  return (
    <TodoPage
      tasks={store.todos}
      onAdd={store.addTodo}
      onDelete={store.deleteTodo}
      onDone={store.toggleStatus}
      renderToDo={(task, onDelete, onDone, key) => (
        <ObservableTask
          task={task}
          onDelete={onDelete}
          onDone={onDone}
          key={key}
        />
      )}
    />
  );
});
