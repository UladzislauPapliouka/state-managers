import { Task } from '@/entities/Task/types.ts';

export interface TodoListState {
  tasks: Task[];
  isLoading: boolean;
  hasError: boolean;
}
