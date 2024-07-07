import { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  ModalCloseButton,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { ActiveTasks } from '../ActiveTasks/ActiveTasks';
import { DoneTasks } from '../DoneTasks/DoneTasks';

export const TodoList = () => {
  const inputRef = useRef(null);

  const handleSaveTask = () => {
    localStorage.setItem('task', inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <Card>
      <Header />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="10">
          <ActiveTasks />
          <DoneTasks />
        </Stack>
      </CardBody>
    </Card>
  );
};
