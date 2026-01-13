import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './slices/authSlice.js';
import modalReducer from './slices/modalSlice.js';


const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export { reduxStore };
