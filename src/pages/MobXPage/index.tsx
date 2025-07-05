import { makeObservable, observable, action } from 'mobx';
import { v1 } from 'uuid';
import { BaseTodoPage } from '../BaseTodoPage';
import { observer } from 'mobx-react-lite';
import { TaskType, TaskComponent } from '@/entities/Task';
import { dummyJsonApi } from '@/features/TodoList/api';
import { useEffect } from 'react';
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
  fetchTodos = action(async ({ signal }: { signal?: AbortSignal }) => {
    const todos = await dummyJsonApi.getTodos({ signal });
    this.todos = todos.map((todo) => new Task(todo.todo));
  });
  reorderTodos = (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => {
    let finalTasks: Task[] = [];
    const currentTask = this.todos.find(
      (el) => el.id === currentTaskId
    ) as Task;
    finalTasks = this.todos.filter((el) => el.id !== currentTaskId);
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
    this.todos = result;
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
  const controller = new AbortController();
  console.log(store.todos);
  useEffect(() => {
    if (store.todos.length === 0) {
      store.fetchTodos({ signal: controller.signal });
    }
    return () => {
      controller.abort();
    };
  }, [store.fetchTodos]);
  return (
    <BaseTodoPage
      tasks={store.todos}
      onAdd={store.addTodo}
      onDelete={store.deleteTodo}
      onDone={store.toggleStatus}
      onTaskReorder={store.reorderTodos}
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
