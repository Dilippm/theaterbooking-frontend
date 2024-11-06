import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice'; // Adjust the path as needed

// Configuration for redux-persist
const persistConfig = {
  key: 'user', // Key specific to the user slice
  storage, // Storage method (localStorage)
  whitelist: ['user'], // Persist only the user slice
};

// Combine all reducers (in case there are more in the future)
const rootReducer = combineReducers({
  user: userReducer,
  // other reducers can go here
});

// Create a persisted reducer for the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor for redux-persist
const persistor = persistStore(store);

export { store, persistor };
