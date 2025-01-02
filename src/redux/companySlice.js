import { createSlice } from '@reduxjs/toolkit';

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    name: 'ABC Corp.',
    communicationMethods: ['Email', 'Phone', 'Slack'],
    scheduling: ['Weekly', 'Monthly'],
  },
  reducers: {
    updateCompanyInfo: (state, action) => {
      state.name = action.payload.name;
      state.communicationMethods = action.payload.communicationMethods;
      state.scheduling = action.payload.scheduling;
    },
  },
});

export const { updateCompanyInfo } = companySlice.actions;
export default companySlice.reducer;
