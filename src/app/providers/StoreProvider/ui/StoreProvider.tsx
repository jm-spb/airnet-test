import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/reduxStore';
import { StateSchema } from '../config/reduxStoreTypes';

interface StoreProviderProps {
  children: ReactNode;
  initialState: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState } = props;
  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
};
