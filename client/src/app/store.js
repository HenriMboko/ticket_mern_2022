import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authnSlice'




export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    auth: authReducer
  },
});
