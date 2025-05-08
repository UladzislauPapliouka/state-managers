import { VStack, Input, Kbd } from '@chakra-ui/react';
import { PageLayout } from '@/entities/PageLayout.tsx';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { Task as TaskType } from '../shared/types';
import { ReactNode } from 'react';

type Props = {
  tasks: TaskType[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  renderToDo: (
    task: TaskType,
    onDelete: (id: string) => void,
    onDone: (id: string) => void,
    key: string
  ) => ReactNode;
};
export const TodoPage = ({
  onAdd,
  onDelete,
  onDone,
  tasks,
  renderToDo
}: Props) => {
  console.log(tasks);

  return (
    <PageLayout>
      <VStack>
        <InputGroup w={400} flex="1" endElement={<Kbd>Enter</Kbd>}>
          <Input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAdd(e.currentTarget.value);
              }
            }}
            placeholder="Task name..."
          />
        </InputGroup>
        {tasks.map((task) => renderToDo(task, onDelete, onDone, task.id))}
      </VStack>
    </PageLayout>
  );
};
