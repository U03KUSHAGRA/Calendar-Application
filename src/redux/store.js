// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import analyticsReducer from '../redux/analyticsSlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    analytics: analyticsReducer,
  },
});