import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import profileReducer from './profileSlice';
export const store = configureStore({
  reducer: {
    user: userReducer, // Use 'user' as the key for your user reducer 
    profile: profileReducer,
  },
});
