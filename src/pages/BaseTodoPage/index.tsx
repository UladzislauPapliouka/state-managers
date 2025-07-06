import { VStack, Input, Kbd, Flex } from '@chakra-ui/react';
import { PageOutletLayout } from '@/shared/ui/PageOutletLayout';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { TaskType } from '@/entities/Task';
import { ReactNode, useState } from 'react';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges
} from '@dnd-kit/modifiers';

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
  const [newTaskName, setNewTaskName] = useState('');
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 10
    }
  });
  return (
    <PageOutletLayout>
      <VStack
        w={'500px'}
        height={'100%'}
        gap={'10'}
        paddingTop={'10'}
        paddingBottom={'10'}
      >
        <InputGroup w={400} endElement={<Kbd>Enter</Kbd>}>
          <Input
            value={newTaskName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAdd(newTaskName);
                setNewTaskName('');
              }
            }}
            onChange={(event) => {
              setNewTaskName(event.currentTarget.value);
            }}
            placeholder="Task name..."
          />
        </InputGroup>
        <Flex
          flex={'1'}
          gap={'2'}
          direction={'column'}
          h={'100%'}
          w={'100%'}
          alignItems={'center'}
          overflowY={'auto'}
          overflowX={'hidden'}
        >
          <DndContext
            onDragEnd={(event) => {
              console.log(event);
              onTaskReorder(
                event.active.id as string,
                event.over?.id as string,
                event.delta.y > 0 ? 'down' : 'up'
              );
            }}
            sensors={[pointerSensor]}
            modifiers={[
              restrictToVerticalAxis,
              restrictToParentElement,
              restrictToWindowEdges
            ]}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={tasks.map((task) => task.id)}
            >
              {tasks.map((task) => renderToDo(task, onDelete, onDone, task.id))}
            </SortableContext>
          </DndContext>
        </Flex>
      </VStack>
    </PageOutletLayout>
  );
};
