import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  ModalCloseButton,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdCheck, MdClose, MdSettings } from 'react-icons/md';

export const TodoList = () => {
  const inputRef = useRef(null);

  const handleInputChange = (e: any) => {
    console.log(inputRef.current.value);
  };

  const handleAddTaskOnButtonClick = () => {
    localStorage.setItem('task', inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <Card>
      <CardHeader>
        <Heading fontSize="fontSizeL" textTransform="uppercase">
          Задачи на сегодня
        </Heading>
        <ModalCloseButton size="xl" />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="10">
          <Box>
            <Heading fontSize="fontSizeM">Активные</Heading>
            <List spacing={3} marginTop="1rem" marginBottom="2rem">
              <ListItem fontSize="fontSizeM" display="flex" alignItems="center" gap="2rem">
                <Flex alignItems="center">
                  <ListIcon as={MdSettings} color="secondary" fontSize="fontSizeL" />
                  <Text noOfLines={1}>
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum idemQuidem
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="1rem">
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Mark task as done"
                    fontSize="fontSizeL"
                    title="Пометить выполненным"
                    icon={<MdCheck />}
                  />
                  <IconButton
                    variant="solid"
                    colorScheme="red"
                    aria-label="Delete task"
                    fontSize="fontSizeL"
                    title="Удалить"
                    icon={<MdClose />}
                  />
                </Flex>
              </ListItem>
            </List>
            <Flex gap="1rem">
              <Input
                ref={inputRef}
                height="3rem"
                fontSize="fontSizeM"
                focusBorderColor="secondary"
                placeholder="Напишите задачу"
                onChange={handleInputChange}
              />
              <Button colorScheme="blue" height="3rem" onClick={handleAddTaskOnButtonClick}>
                Добавить
              </Button>
            </Flex>
          </Box>
          <Box>
            <Heading fontSize="fontSizeM">Выполненные</Heading>
            <List spacing={3} marginTop="1rem">
              <ListItem fontSize="fontSizeM" display="flex" alignItems="center" gap="2rem">
                <Flex alignItems="center">
                  <ListIcon as={MdCheck} color="success" fontSize="fontSizeL" />
                  <Text noOfLines={1}>
                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum idemQuidem
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="1rem">
                  <IconButton
                    variant="outline"
                    colorScheme="blue"
                    aria-label="Mark task as done"
                    fontSize="fontSizeL"
                    title="Пометить активным"
                    icon={<MdSettings />}
                  />
                  <IconButton
                    variant="solid"
                    colorScheme="red"
                    aria-label="Delete task"
                    fontSize="fontSizeL"
                    title="Удалить"
                    icon={<MdClose />}
                  />
                </Flex>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
