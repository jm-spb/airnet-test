import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { UserSchema } from 'entities/User/model/types/user';
import { StateSchema } from './reduxStoreTypes';

// createReduxStore - для подключения стора в тестах
export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
  };

  const reduxStore = configureStore({
    reducer: rootReducers,
    devTools: __IS_DEV__,

    // preloadedState - для тестов
    preloadedState: initialState,
  });

  return reduxStore;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
