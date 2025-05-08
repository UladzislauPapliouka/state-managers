import { Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
// import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import styles from './Task.module.css';
import { Task as TaskType } from '../../shared/types';
type Props = {
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  // onEdit: (id: string, newName: string) => void;
  task: TaskType;
};
export const Task = ({ task, onDelete, onDone }: Props) => {
  return (
    <HStack
      borderWidth={1}
      borderStyle={'solid'}
      borderColor={'gray.700'}
      borderRadius={'md'}
      padding={2}
      width={'400px'}
      overflow={'hidden'}
    >
      <Checkbox checked={task.isDone} onChange={() => onDone(task.id)} />
      <Text
        overflow={'hidden'}
        overflowWrap={'normal'}
        textOverflow={'ellipsis'}
        wordWrap={'normal'}
        display={'inline'}
        flexGrow={1}
        flexShrink={1}
      >
        {task.name}
      </Text>
      <ButtonGroup className={styles.buttons}>
        {/* <Button onClick={() => onEdit(task.id)}>
          <FiEdit />
        </Button> */}
        <Button onClick={() => onDelete(task.id)}>
          <MdDelete />
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
