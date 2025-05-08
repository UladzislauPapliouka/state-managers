import { VStack, Input, Kbd } from '@chakra-ui/react';
import { PageOutletLayout } from '@/shared/ui/PageOutletLayout';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { TaskType } from '@/entities/Task';
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
export const BaseTodoPage = ({
  onAdd,
  onDelete,
  onDone,
  tasks,
  renderToDo
}: Props) => {
  console.log(tasks);

  return (
    <PageOutletLayout>
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
    </PageOutletLayout>
  );
};
