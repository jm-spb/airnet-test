import React, { useEffect, useRef } from 'react';
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
import { UserTasks } from 'entities/User/model/types/user';

export const ActiveTasks = (): React.ReactNode => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { tasks, selectedDay } = useSelector((state: StateSchema) => state.user);
  const userDayTasks = tasks.find((task) => task.date === selectedDay);

  useEffect(() => {
    const foundActiveTasks = localStorage.getItem(selectedDay);
    if (foundActiveTasks && !userDayTasks) {
      const activeTasksParsed = JSON.parse(foundActiveTasks);
      dispatch(userActions.renderActiveTasks(activeTasksParsed.active));
    }
  }, []);

  const handleAddTask = () => {
    if (inputRef.current.value) dispatch(userActions.addActiveTask(inputRef.current.value));
    inputRef.current.value = '';
  };

  const handleSaveTask = () => {
    if (userDayTasks) {
      localStorage.setItem(selectedDay, JSON.stringify({ active: userDayTasks.active }));
      inputRef.current.value = '';

      // TODO: Заменить на кастомное оповещение
      alert('Задача сохранена в Local Storage');
    }
  };

  const handleMarkAsDone = (idx: number) => {
    dispatch(userActions.markTaskAsDone(idx));
    dispatch(userActions.deleteActiveTask(idx));

    // TODO: вынести в shared как функцию-хэлпер
    const storedTasks = localStorage.getItem(selectedDay);
    if (storedTasks) {
      const parsedTasks: UserTasks = JSON.parse(storedTasks);
      if (parsedTasks.active) {
        parsedTasks.active = parsedTasks.active.filter((_, index) => index !== idx);
      }

      localStorage.setItem(selectedDay, JSON.stringify(parsedTasks));

      if (parsedTasks.active.length === 0) {
        localStorage.removeItem(selectedDay);
      }
    }
  };

  const handleDeleteTask = (idx: number) => {
    dispatch(userActions.deleteActiveTask(idx));

    // TODO: вынести в shared как функцию-хэлпер
    const storedTasks = localStorage.getItem(selectedDay);
    if (storedTasks) {
      const parsedTasks: UserTasks = JSON.parse(storedTasks);
      if (parsedTasks.active) {
        parsedTasks.active = parsedTasks.active.filter((_, index) => index !== idx);
      }

      localStorage.setItem(selectedDay, JSON.stringify(parsedTasks));

      if (parsedTasks.active.length === 0) {
        localStorage.removeItem(selectedDay);
      }
    }
  };

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
