import { VStack, Input, Kbd } from '@chakra-ui/react';
import { PageLayout } from '@/components/PageLayout.tsx';
import { Task } from '../Task';
import { InputGroup } from '../ui/input-group';
import { Task as TaskType } from '@/types';

type Props = {
  tasks: TaskType[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
};
export const TodoPage = ({ onAdd, onDelete, onDone, tasks }: Props) => {
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
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onDone={onDone} />
        ))}
      </VStack>
    </PageLayout>
  );
};
