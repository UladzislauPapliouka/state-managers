import { Task } from '@/entities/Task/types';
import { dummyJsonAxiosInstance } from '@/shared/api';

// API response interfaces
export interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: TodoItem[];
  total: number;
  skip: number;
  limit: number;
}

// Conversion function from TodoItem to Task
export const convertTodoItemToTask = (todoItem: TodoItem): Task => ({
  id: todoItem.id.toString(),
  name: todoItem.todo,
  isDone: todoItem.completed
});

export const dummyJsonApi = {
  getTodos: async ({ signal }: { signal?: AbortSignal }) => {
    const data = await dummyJsonAxiosInstance.get<TodosResponse>('/todos', {
      signal
    });
    return data.data.todos;
  },
  addTodo: (todo: Task) => dummyJsonAxiosInstance.post('/todos', todo),
  updateTodo: (todo: Task) =>
    dummyJsonAxiosInstance.put(`/todos/${todo.id}`, todo)
};
