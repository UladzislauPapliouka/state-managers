import { makeObservable, observable, action } from 'mobx';
import { v1 } from 'uuid';
import { BaseTodoPage } from '../BaseTodoPage';
import { observer } from 'mobx-react-lite';
import { TaskType, TaskComponent } from '@/entities/Task';
import { convertTodoItemToTask, dummyJsonApi } from '@/features/TodoList/api';
import { toaster } from '@/shared/ui/toaster';
class Task {
  id: string;
  name: string;
  isDone: boolean;

  constructor(name: string, id: string = v1(), isDone: boolean = false) {
    makeObservable(this, {
      name: observable,
      isDone: observable,
      toggleStatus: action
    });

    this.name = name;
    this.id = id;
    this.isDone = isDone;
  }

  toggleStatus() {
    this.isDone = !this.isDone;
  }
}

export class Todos {
  todos: Task[] = [];
  constructor() {
    const controller = new AbortController();
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      deleteTodo: action,
      toggleStatus: action
    });
    this.fetchTodos({ signal: controller.signal });
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
  fetchTodos = action(async ({ signal }: { signal: AbortSignal }) => {
    const todos = await dummyJsonApi.getTodos({ signal, userId: 1 });
    this.todos = todos.map((todo) => {
      const { id, isDone, name } = convertTodoItemToTask(todo);
      return new Task(name, id, isDone);
    });
    toaster.create({ type: 'success', title: 'Todos fetched' });
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
    this.todos = result;
  };
}

const ObservableTask = observer(
  ({
    task,
    onDelete,
    onDone
  }: {
    task: TaskType;
    onDelete: (id: string) => void;
    onDone: (id: string) => void;
  }) => (
    <TaskComponent
      onDelete={onDelete}
      onDone={onDone}
      key={task.id}
      task={{ id: task.id, name: task.name, isDone: task.isDone }}
    />
  )
);
export const MobXPage = observer(({ store }: { store: Todos }) => {
  return (
    <BaseTodoPage
      tasks={store.todos}
      onAdd={store.addTodo}
      onDelete={store.deleteTodo}
      onDone={store.toggleStatus}
      onTaskReorder={store.reorderTodos}
      renderToDo={(task, onDelete, onDone, keyProp) => (
        <ObservableTask
          task={task}
          onDelete={onDelete}
          onDone={onDone}
          key={task.id}
        />
      )}
    />
  );
});
