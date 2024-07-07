import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Heading, IconButton, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { MdCheck, MdClose, MdSettings } from 'react-icons/md';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';

export const DoneTasks = memo((): React.ReactNode => {
  const dispatch = useDispatch();
  const { tasks, selectedDay } = useSelector((state: StateSchema) => state.user);
  const userDayTasks = tasks.find((task) => task.date === selectedDay);

  const handleMarkAsActive = (idx: number) => {
    dispatch(userActions.markTaskAsActive(idx));
    dispatch(userActions.deleteDoneTask(idx));
  };

  const handleDeleteTask = (idx: number) => dispatch(userActions.deleteDoneTask(idx));

  return (
    <Box>
      <Heading fontSize="fontSizeM">Выполненные</Heading>
      <List spacing={3} marginTop="1rem">
        {userDayTasks?.done?.map((task, idx) => (
          <ListItem
            key={task}
            fontSize="fontSizeM"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="2rem">
            <Flex alignItems="center">
              <ListIcon as={MdCheck} color="success" fontSize="fontSizeL" />
              <Text noOfLines={1} as="del">
                {task}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="1rem">
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label="Mark task as done"
                fontSize="fontSizeL"
                title="Пометить активным"
                onClick={() => handleMarkAsActive(idx)}
                icon={<MdSettings />}
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
    </Box>
  );
});
