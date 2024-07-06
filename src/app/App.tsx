import { Suspense } from 'react';
import { Container } from '@chakra-ui/react';
import { AppRouter } from './providers/router';

const App = () => (
  <Container maxW="100vw" h="100vh" bg="backgroundMain" color="textPrimary">
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
  </Container>
);

export default App;
