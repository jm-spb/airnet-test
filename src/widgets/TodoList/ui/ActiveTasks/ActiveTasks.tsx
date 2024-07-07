import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { MdCheck, MdClose, MdSettings } from 'react-icons/md';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';

export const ActiveTasks = (): React.ReactNode => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { tasks, selectedDay } = useSelector((state: StateSchema) => state.user);
  const userDayTasks = tasks.find((task) => task.date === selectedDay);

  const handleAddTask = () => {
    if (inputRef.current.value) dispatch(userActions.addActiveTask(inputRef.current.value));
    inputRef.current.value = '';
  };

  const handleSaveTask = () => {
    localStorage.setItem('task', inputRef.current.value);
    inputRef.current.value = '';
  };

  const handleMarkAsDone = (idx: number) => {
    dispatch(userActions.markTaskAsDone(idx));
    dispatch(userActions.deleteActiveTask(idx));
  };

  const handleDeleteTask = (idx: number) => dispatch(userActions.deleteActiveTask(idx));

  return (
    <Box>
      <Heading fontSize="fontSizeM">Активные</Heading>
      <List spacing={3} marginTop="1rem" marginBottom="2rem">
        {userDayTasks?.active?.map((task, idx) => (
          <ListItem
            key={task}
            fontSize="fontSizeM"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="2rem">
            <Flex alignItems="center">
              <ListIcon as={MdSettings} color="secondary" fontSize="fontSizeL" />
              <Text noOfLines={1}>{task}</Text>
            </Flex>
            <Flex alignItems="center" gap="1rem">
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Mark task as done"
                fontSize="fontSizeL"
                title="Пометить выполненным"
                onClick={() => handleMarkAsDone(idx)}
                icon={<MdCheck />}
              />
              <IconButton
                variant="solid"
                colorScheme="red"
                aria-label="Delete task"
                fontSize="fontSizeL"
                title="Удалить"
                onClick={() => handleDeleteTask(idx)}
                icon={<MdClose />}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
      <Flex gap="1rem">
        <Input
          ref={inputRef}
          height="3rem"
          fontSize="fontSizeM"
          focusBorderColor="secondary"
          placeholder="Напишите задачу"
        />
        <Button variant="outline" colorScheme="blue" height="3rem" onClick={handleAddTask}>
          Добавить
        </Button>
        <Button colorScheme="blue" height="3rem" onClick={handleSaveTask}>
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
};
