import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import employeeReducer from './employeeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Specify which reducers you want to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    employees: employeeReducer,
  },
  
});

const persistor = persistStore(store);

export { store, persistor };
