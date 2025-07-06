import { InputGroup } from '@/shared/ui/input-group.tsx';
import { Input, Kbd } from '@chakra-ui/react';
import { useState } from 'react';

export const AddTaskInput = ({
  onAdd
}: {
  onAdd: (taskName: string) => void;
}) => {
  const [newTaskName, setNewTaskName] = useState('');

  return (
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
  );
};
