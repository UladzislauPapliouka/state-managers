import { InputGroup } from '@/shared/ui/input-group.tsx';
import { Box, Field, Input, Kbd, defineStyle } from '@chakra-ui/react';
import { useState } from 'react';
import * as z from 'zod/v3';

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg.muted',
  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'fg.muted',
    top: '2.5',
    insetStart: '3'
  },
  _peerFocusVisible: {
    color: 'fg',
    top: '-3',
    insetStart: '2'
  }
});

const userSchema = z
  .string()
  .min(3, 'Task name must be at least 3 characters')
  .nonempty('Task name is required');

export const AddTaskInput = ({
  onAdd
}: {
  onAdd: (taskName: string) => void;
}) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (taskName: string) => {
    const result = userSchema.safeParse(taskName);
    if (result.success) {
      onAdd(taskName);
      setNewTaskName('');
      setError(null);
    } else {
      setError(result.error.errors[0].message);
    }
  };

  return (
    <Field.Root h={70} w={400} invalid={!!error}>
      <Box position="relative" w={'100%'}>
        <InputGroup w={'100%'} endElement={<Kbd>Enter</Kbd>}>
          <div style={{ width: '100%' }}>
            <Input
              className="peer"
              value={newTaskName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(newTaskName);
                }
              }}
              onChange={(event) => {
                setError(null);
                setNewTaskName(event.currentTarget.value);
              }}
              onBlur={() => {
                setError(null);
              }}
              placeholder=""
            />
            <Field.Label css={floatingStyles}>Task name...</Field.Label>
          </div>
        </InputGroup>
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Box>
    </Field.Root>
  );
};
