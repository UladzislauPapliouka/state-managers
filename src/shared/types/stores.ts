export interface Task {
  id: string;
  name: string;
  isDone: boolean;
}

export interface TodoListState {
  tasks: Task[];
  isLoading: boolean;
  hasError: boolean;
}
