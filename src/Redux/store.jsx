import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/UserSlice'; 
const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;