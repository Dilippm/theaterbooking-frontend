import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage as the default storage
import userReducer from './userSlice'; // Adjust the path as needed

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage method (localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Create Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer, // Apply the persisted reducer
  },
});

// Create a persistor for redux-persist
const persistor = persistStore(store);

export { store, persistor };
