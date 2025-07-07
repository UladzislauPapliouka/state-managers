import { Tabs } from '@chakra-ui/react';
import { memo } from 'react';

export const TaskFilters = memo(function TaskFilters({
  filterTask,
  filter
}: {
  filterTask: (filter: string) => void;
  filter: string;
}) {
  return (
    <Tabs.Root
      w={500}
      variant="enclosed"
      style={{ borderRadius: '10px', borderColor: 'red' }}
      value={filter}
    >
      <Tabs.List w={'100%'} backgroundColor={'bg.emphasized'}>
        <Tabs.Trigger flex={1} value="all" onClick={() => filterTask('all')}>
          All
        </Tabs.Trigger>
        <Tabs.Trigger
          flex={1}
          value="active"
          onClick={() => filterTask('active')}
        >
          Active
        </Tabs.Trigger>
        <Tabs.Trigger
          flex={1}
          value="completed"
          onClick={() => filterTask('completed')}
        >
          Completed
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
});
