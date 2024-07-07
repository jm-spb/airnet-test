import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import theme from './shared/config/chakraTheme/chakraTheme';
import App from './app/App';
import './app/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider
    initialState={{
      user: { tasks: [{ date: '', active: [], done: [] }], selectedDay: '' },
    }}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StoreProvider>
);
