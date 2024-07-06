import { Container } from '@chakra-ui/react';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Loader } from 'shared/ui/Loader/Loader';

const AppRouter = () => {
  const elements = useRoutes(Object.values(routeConfig));

  return <Suspense fallback={<Loader />}>{elements}</Suspense>;
};

export default AppRouter;
