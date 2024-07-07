import { Card, CardBody, Stack, StackDivider } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import { ActiveTasks } from '../ActiveTasks/ActiveTasks';
import { DoneTasks } from '../DoneTasks/DoneTasks';

export const TodoList = () => (
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
