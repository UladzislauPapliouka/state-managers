import { VStack, Input, Kbd } from '@chakra-ui/react';
import { PageOutletLayout } from '@/shared/ui/PageOutletLayout';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { TaskType } from '@/entities/Task';
import { ReactNode } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

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
  onTaskReorder: (
    currentTaskId: string,
    overTaskId: string,
    direction: 'up' | 'down'
  ) => void;
};
export const BaseTodoPage = ({
  onAdd,
  onDelete,
  onDone,
  tasks,
  renderToDo,
  onTaskReorder
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
        <DndContext
          onDragEnd={(event) => {
            console.log(event);
            onTaskReorder(
              event.active.id as string,
              event.over?.id as string,
              event.delta.y > 0 ? 'down' : 'up'
            );
          }}
        >
          <SortableContext items={tasks.map((task) => task.id)}>
            {tasks.map((task) => renderToDo(task, onDelete, onDone, task.id))}
          </SortableContext>
        </DndContext>
      </VStack>
    </PageOutletLayout>
  );
};
