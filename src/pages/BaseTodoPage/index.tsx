import { VStack, Flex } from '@chakra-ui/react';
import { PageOutletLayout } from '@/shared/ui/PageOutletLayout';
import { TaskType } from '@/entities/Task';
import { ReactNode } from 'react';

import { AddTaskInput } from '@/entities/AddTaskInput';
import { TaskFilters } from '@/entities/TaskFiltes';
import { TaskPagination } from '@/features/Pagination';

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
  filterTask?: (filter: string) => void;
  filter?: string;
  handleChangePage?: (page: number) => void;
  allTodosLength?: number;
};
export const BaseTodoPage = ({
  onAdd,
  onDelete,
  onDone,
  tasks,
  renderToDo,
  filter,
  filterTask = (filter: string) => {
    console.log(filter);
  },
  handleChangePage = (v) => {
    console.log(v);
  },
  allTodosLength = 0
  // onTaskReorder
}: Props) => {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     delay: 300,
  //     tolerance: 10
  //   }
  // });
  return (
    <PageOutletLayout>
      <VStack justifyContent={'flex-start'}>
        <TaskFilters filterTask={filterTask} filter={filter || 'all'} />
      </VStack>
      <VStack w={'500px'} height={'100%'} gap={'10'}>
        <AddTaskInput onAdd={onAdd} />
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
          {/* <DndContext
            onDragEnd={(event) => {

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
            > */}
          {tasks.map((task) => renderToDo(task, onDelete, onDone, task.id))}
          {/* </SortableContext>
          </DndContext> */}
        </Flex>
      </VStack>
      <VStack>
        <TaskPagination
          todosLength={allTodosLength}
          handleChangePage={handleChangePage}
        />
      </VStack>
    </PageOutletLayout>
  );
};
