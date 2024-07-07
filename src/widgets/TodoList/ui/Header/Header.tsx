import { useSelector } from 'react-redux';
import { CardHeader, Heading, ModalCloseButton } from '@chakra-ui/react';
import { StateSchema } from 'app/providers/StoreProvider';

export const Header = (): React.ReactNode => {
  const { selectedDay } = useSelector((state: StateSchema) => state.user);

  return (
    <CardHeader>
      <Heading fontSize="fontSizeL" textTransform="uppercase">
        {`Задачи на ${selectedDay}`}
      </Heading>
      <ModalCloseButton size="xl" />
    </CardHeader>
  );
};
