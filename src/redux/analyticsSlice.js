// src/redux/analyticsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    communicationFrequency: {},
    engagementEffectiveness: {},
  },
  reducers: {
    setCommunicationFrequency: (state, action) => {
      state.communicationFrequency = action.payload;
    },
    setEngagementEffectiveness: (state, action) => {
      state.engagementEffectiveness = action.payload;
    },
  },
});

export const { setCommunicationFrequency, setEngagementEffectiveness } = analyticsSlice.actions;
export default analyticsSlice.reducer;