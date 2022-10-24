import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authnSlice'
//import ticketReducer from '../features/ticket/ticketSlice';




export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    auth: authReducer,
    //ticket: ticketReducer,

  },
});
