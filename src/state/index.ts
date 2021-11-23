import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

const persistConfig = {
  key: 'synapse',
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const storeState = persistStore(store);

export { store, storeState };
