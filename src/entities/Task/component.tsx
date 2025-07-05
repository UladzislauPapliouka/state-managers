import { Button, ButtonGroup, HStack, Input, Text } from '@chakra-ui/react';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import styles from './index.module.css';
import { Task as TaskType } from './types';
import {
  KeyboardEventHandler,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import { useSortable } from '@dnd-kit/sortable';

type Props = {
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, newName: string) => void;
  task: TaskType;
};
export const Task = ({ task, onDelete, onDone, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const handleTaskRename = (event: SyntheticEvent<HTMLInputElement>) => {
    setNewTaskName(event.currentTarget.value);
  };
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (isEditing === false && newTaskName !== task.name) {
      onEdit(task.id, newTaskName);
    }
  }, [isEditing, newTaskName, onEdit]);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      }
    : null;
  return (
    <HStack
      borderWidth={1}
      borderStyle={'solid'}
      borderColor={'gray.700'}
      borderRadius={'md'}
      padding={2}
      width={'400px'}
      overflow={'hidden'}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Checkbox checked={task.isDone} onChange={() => onDone(task.id)} />
      {isEditing ? (
        <Input
          value={newTaskName}
          onChange={handleTaskRename}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
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
      )}
      <ButtonGroup className={styles.buttons}>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <FiEdit />
        </Button>
        <Button onClick={() => onDelete(task.id)}>
          <MdDelete />
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
